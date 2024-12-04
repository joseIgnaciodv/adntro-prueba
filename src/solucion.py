from flask import Flask
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

def loadData(url: str):
    data = pd.read_csv('/home/ignaciodvb/mysite/input/' + url, sep="\t")    # Datos separados por tabulador ("\t")
    return data

def calculateCallRate(url: str):
    data = loadData(url)        # Cargar datos del fichero seleccionando
    validVariants = len(data[data['GENOTYPE'] != "--"])    # Número de variantes válidos = Filas donde genotipo no sea vacío "--"
    totalVariants = len(data)      # Número de variantes totales = Número de filas del archivo (incluyendo filas vacías "--")
    callRate = round((validVariants / totalVariants) * 100, 2)
    return callRate

def calculateChromosomeVariants(url: str):
    results = []
    data = loadData(url)    # Cargar datos del fichero seleccionando
    validVariants = data[data['GENOTYPE'] != "--"]    # Dataframe nuevo con variantes válidos (Genotipos no vacíos "--")
    chromosomeList = data['CHR'].drop_duplicates().to_list()
    chromosomeVariants = validVariants.groupby("CHR").count()['GENOTYPE'].to_list()   # Juntar valores iguales del cromosoma y contar el número
    for i in range(0, len(chromosomeVariants)):
        variant = {'chromosome': str(chromosomeList[i]), 'variantCount': chromosomeVariants[i]}
        results.append(variant)
    return results

def saveResults(url: str):
    callRate = str(calculateCallRate(url))
    chromosomeVariants = calculateChromosomeVariants(url)
    fileFormat = url.split("_")[1] + "_" + url.split("_")[2]
    results = open("/home/ignaciodvb/mysite/resumen_" + fileFormat + ".txt", "w")    # Guardar resultados en el fichero resumen_nombre_paciente.txt
    results.write("Call rate: " + callRate + "%" + "\n")
    results.write("\nVariantes cromosoma: \n")
    for variant in chromosomeVariants:
        results.write("Cromosoma " + str(variant['chromosome']) + ": " + str(variant['variantCount']) + "\n")        # Para cada cromosoma de las variantes
    results.close()

@app.route("/calculate_call_rate/<url>", methods=['GET'])
def getCallRate(url: str):
    callRate = calculateCallRate(url)
    return str(callRate)

@app.route("/calculate_chromosome_variants/<url>", methods=['GET'])
def getVariants(url: str):
    variants = calculateChromosomeVariants(url)
    return {'response': variants}

@app.route("/save_results/<url>", methods=['GET'])
def save(url: str):
    saveResults(url)
    return "200"
