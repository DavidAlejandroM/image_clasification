# from PIL import Image
# image = Image.open('python/1.jpg')
# image.rotate(45).show()
# hola = 100
# print(str(hola))

import tensorflow as tf
import time
from datetime import timedelta
import math
import random
import numpy as np
from PIL import Image
import os 
import glob
import argparse
import scipy as sy
import sklearn as sk
from sklearn.utils import shuffle
import sys
import orm
from datetime import datetime

#validamos el parametro de entrada si no tiene toma la raiz como predefinido
if(len(sys.argv)>1):
    path = sys.argv[1]
else:
    path = ''


filename = path + "1.jpg"
modelName = path + "model/model-photos"
classes = ['personas','animales','urbano','paisaje','transporte']
text_file = open("Output.txt", "w")

# obtenemos las fotos de la base de datos
fotos = orm.Fotos.select()


for clase in classes:
    text_file.write(str(clase)+'\t')

for foto in fotos:
    
    text_file.write(foto.nombre+'\n')
    filename = foto.ruta + foto.nombre
    image_size=128
    num_channels=3
    images = []
    # Reading the image using 
    image = Image.open(filename)
    images = image.resize((image_size,image_size))
    images = np.asarray( images, dtype="uint8" )
    images = images.astype('float32')
    images = np.multiply(images, 1.0/255.0) 

    #The input to the network is of shape [None image_size image_size num_channels]. Hence we reshape.
    x_batch = images.reshape(1, image_size,image_size,num_channels)

    ## Let us restore the saved model 
    sess = tf.Session()
    # Step-1: Recreate the network graph. At this step only graph is created.
    meta = modelName + '.meta'

    saver = tf.train.import_meta_graph(meta)
    #saver = tf.train.import_meta_graph('dogs-cats-model.meta')
    # Step-2: Now let's load the weights saved using the restore method.
    saver.restore(sess, tf.train.latest_checkpoint('./'+path+'model/'))

    # Accessing the default graph which we have restored
    graph = tf.get_default_graph()

    # Now, let's get hold of the op that we can be processed to get the output.
    # In the original network y_pred is the tensor that is the prediction of the network
    y_pred = graph.get_tensor_by_name("y_pred:0")

    ## Let's feed the images to the input placeholders
    x= graph.get_tensor_by_name("x:0") 
    y_true = graph.get_tensor_by_name("y_true:0") 
    y_test_images = np.zeros((1, 5)) 


    ### Creating the feed_dict that is required to be fed to calculate y_pred 
    feed_dict_testing = {x: x_batch, y_true: y_test_images}
    result = sess.run(y_pred, feed_dict=feed_dict_testing)
    # result is of this format [probabiliy_of_rose probability_of_sunflower]
    sess.close()
    print(classes)
    print(result)

    result = result.tolist()
    
    myarray = np.asarray(result)
    text_file.write(str(len(result))+'\n')
    for respuesta in myarray:
        text_file.write(str(respuesta)+'\n')
    #text_file.write(str(result)+'\n')

text_file.close()