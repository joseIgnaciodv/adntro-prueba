# Análisis Básico de Genotipado - ADNTRO Prueba

## Descripción

Una aplicación desarrollada en **Angular v16** con un backend eficiente construido en **Flask** y **Python** (fichero solucion.py) para procesar archivos de genotipado. Permite calcular métricas clave como el **Call Rate** y la distribución de variantes genéticas por cromosoma a partir de archivos seleccionados por el usuario.

## Explicación Cálculos

El Call Rate se ha cálculado, obteniendo el número total de variantes validos presentes, es decir todos aquellos registros donde el atributo `GENOTYPE` en los datos no sea vacío (`--`), y dividirlo por el número total de variantes presentes (validos + no validos), multiplicado por 100 para obtener el porcentage

Los variantes validos para cada cromosoma se obtienen, primero sacando todos los variantes validos presentes (`GENOTYPE` no es igual a `--`), juntar los variantes validos por cromosoma, es decir agrupar por `CHR`, y finalmente contar los variantes

## Instrucciones ejecución

1. Clonar repositorio `https://github.com/joseIgnaciodv/adntro-prueba.git`

2. Instalar las dependencias del proyecto, `npm install` o `npm i`

3. Introducir `ng serve` en la línea de comandos, para ejecutar la aplicación

4. Copiar `http://localhost:4200/` en cualquier navegador para empezar a usar la aplicación
