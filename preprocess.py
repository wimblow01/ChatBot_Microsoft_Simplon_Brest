from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
import string
import numpy as np
import pickle
import random


class Preprocess:

    @classmethod
    def preproc(cls, sentence):

        cls.tokenizer = pickle.load(open("Api/tokenizer.p", "rb" ))
        cls.input_shape = 14
        #get the tokenizer from model training
        cls.texts_p = []
        cls.prediction_input = sentence #removing punctuation and converting to lowercase
        cls.prediction_input = [letters.lower() for letters in cls.prediction_input if letters not in string.punctuation]
        cls. prediction_input = ''.join(cls.prediction_input)
        cls.texts_p.append(cls.prediction_input)  #tokenizing and padding
        cls.prediction_input = cls.tokenizer.texts_to_sequences(cls.texts_p)
        cls.prediction_input = np.array(cls.prediction_input).reshape(-1)
        cls.prediction_input = pad_sequences([cls.prediction_input],cls.input_shape)        
        
        print(cls.prediction_input)
        return cls.prediction_input

# Preprocess.preproc("Je suis un handicapé")