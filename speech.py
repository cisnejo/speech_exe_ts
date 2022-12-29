import speech_recognition as sr
import pyttsx3
from playsound import playsound
import json
import subprocess
import os


def SpeechToText():

    r = sr.Recognizer()

    with sr.Microphone() as source2:
        r.adjust_for_ambient_noise(source2, duration=0.5)
        audio2 = r.listen(source2)
        MyText = r.recognize_google(audio2)
        MyText = MyText.lower()
        if (MyText):
            return MyText


def speak(serialized_list):

    serialized_list = json.loads(serialized_list)
    # if (SpeechToText() == "computer"):
    playsound('./sounds/start-13691.mp3')
    new_word = SpeechToText()
    for command in serialized_list:
        if (new_word == "open " + command["command"].lower()):
            app_path = command["path"]
            playsound('./sounds/320181__dland__hint.wav')
            os.startfile(app_path)
            return {"message": "opened " + command['command']}
    # else:
    #     print({"message": "incorrect activation"})
