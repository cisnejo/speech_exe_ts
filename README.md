


## Install

Clone the repo and install dependencies:

```bash
git clone  https://github.com/cisnejo/speech_exe_ts.git your-project-name
cd your-project-name
npm install
```
Install virtualenv and create a new environment
```bash
python -m pip install --user virtualenv
virtualenv venv
```

Activate the virtual environment:
```bash
  Windows: PS> venv\Scripts\activate
  Linux + MacOS: $ source venv/bin/activate
  ```
Install python dependancies 
```bash 
(venv) python -m pip install -r requirements.txt 
```
**Having issues installing Electron? See [debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

## Packaging for Production

To package apps for the local platform:

Bundle python into an exe using pyinstaller
  With your virtual environment active:
  
```bash 
(venv) pyinstaller -m server.py 
```

Copy the following files into the assets folder
  - All sound files in "sounds" folder
  - In the "dist" folder, move "server.exe" to "assets" folder in root directory
  
  ```bash
npm run package
  ```
Run "ElectronReactSetup.exe", found in "release\build" 

## Electron-BoilerPlate Docs

See our [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)
