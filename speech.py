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
        speechText = r.recognize_google(
            audio2, language='en-IN', show_all=True)
        return speechText


def speak(serialized_list):

    serialized_list = json.loads(serialized_list)
    # if (SpeechToText() == "computer"):
    playsound('./sounds/start-13691.mp3')
    speechText = SpeechToText()
    if (not speechText):
        return ({"error": "speech not recognized"})
    commandText = speechText.get("alternative")[0].get("transcript").lower()
    for command in serialized_list:
        if (commandText == "open " + command["command"].lower()):
            app_path = command["path"]
            playsound('./sounds/320181__dland__hint.wav')
            os.startfile(app_path)
            return {"message": "opened " + command['command']}
    return ({"message": "||" + commandText + "|| is not a valid command"})
