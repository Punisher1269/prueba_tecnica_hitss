import io

import pandas as pd

from services.exceptions import ArchivoInvalidoError


def _leer_y_validar(contenido: bytes) -> tuple[pd.DataFrame, list[dict], int]:

    COLUMNAS_NUMERICAS = ["ID_ALARMA", "2G", "3G", "4G"]
    COLUMNAS_TEXTO = ["MUNICIPIO", "DEPARTAMENTO", "NOTIFICADA"]
    FORMATO_FECHA = "%d-%b-%y %I.%M.%S.%f %p"
    COLUMNAS = ["ID_ALARMA", "2G", "3G", "4G", "FECHA_CREACION", "MUNICIPIO", "DEPARTAMENTO", "NOTIFICADA"]
    TECNOLOGIAS = ["2G", "3G", "4G"]
    
    try:
        data = pd.read_csv(io.BytesIO(contenido), sep="|", dtype=str, encoding="utf-8-sig")
    except UnicodeDecodeError:
        raise ArchivoInvalidoError("El archivo debe estar codificado en UTF-8") from None
    except pd.errors.EmptyDataError:
        raise ArchivoInvalidoError("El archivo está vacío") from None
    except pd.errors.ParserError as e:
        raise ArchivoInvalidoError(f"El archivo tiene filas mal formadas: {e}") from None
            
    # 0. Normalizar los nombres de las columnas
    data.columns = data.columns.str.strip().str.upper()

    # ---- Validación del archivo completo ----
    if len(data.columns) == 1:
        raise ArchivoInvalidoError("El archivo debe estar separado por '|'")

    faltantes = [c for c in COLUMNAS if c not in data.columns]
    if faltantes:
        raise ArchivoInvalidoError(f"Faltan columnas: {', '.join(faltantes)}")
    
    # 1. Columnas numéricas: texto → número
    for col in COLUMNAS_NUMERICAS:
        data[col] = pd.to_numeric(data[col].str.strip(), errors="coerce")


    
    # 2. Fecha: recortar nanosegundos a microsegundos y convertir
    fecha_texto = (
        data["FECHA_CREACION"]
        .str.strip()
        .str.replace(r"(\.\d{6})\d+", r"\1", regex=True)
    )
    data["FECHA_CREACION"] = pd.to_datetime(fecha_texto, format=FORMATO_FECHA, errors="coerce")

    # 3. Columnas de texto: quitar espacios
    for col in COLUMNAS_TEXTO:
        data[col] = data[col].str.strip()
    data["NOTIFICADA"] = data["NOTIFICADA"].str.upper()

        # ---- Reglas por fila: cada una es una máscara donde True = error ----
    reglas = {
        "ID_ALARMA vacío o no numérico": data["ID_ALARMA"].isna(),
        "FECHA_CREACION con formato inválido": data["FECHA_CREACION"].isna(),
        "MUNICIPIO vacío": data["MUNICIPIO"].isna() | (data["MUNICIPIO"] == ""),
        "DEPARTAMENTO vacío": data["DEPARTAMENTO"].isna() | (data["DEPARTAMENTO"] == ""),
        "NOTIFICADA debe ser 'N' o 'S'": ~data["NOTIFICADA"].isin(["N", "S"]),
    }
    for tec in TECNOLOGIAS:
        reglas[f"{tec} no es un número"] = data[tec].isna()
        reglas[f"{tec} fuera de rango (-100 a 100)"] = data[tec].notna() & ~data[tec].between(-100, 100)

    # ---- Aplicar las reglas y registrar los errores ----
    invalida = pd.Series(False, index=data.index)
    errores = []

    for motivo, mascara in reglas.items():
        invalida |= mascara
        for i in data.index[mascara]:
            errores.append({"fila": int(i) + 2, "motivo": motivo})

    errores.sort(key=lambda e: e["fila"])

    # ---- Separar válidas e inválidas ----
    validas = data[~invalida].copy()
    validas = validas.drop_duplicates(subset="ID_ALARMA", keep="last")
    validas[["ID_ALARMA", *TECNOLOGIAS]] = validas[["ID_ALARMA", *TECNOLOGIAS]].astype(int)

    print(f"Válidas: {len(validas)}  |  Inválidas: {int(invalida.sum())}")
    # print(errores[:10])
    # print(validas.dtypes)

    return validas, errores, int(invalida.sum())