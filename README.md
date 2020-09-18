# AIDENANALYSIS. Your physio assistant.

### AIDENANALYSIS is a web app utilising **_tensorflow.js_**, browser-based Machine Learning library, to enable accessible physiotherapy for the Visually Impaired and other people as well - talking through exercises by responding to users' postures in real-time.

AIDENANALYSIS makes it easier for users to not only complete but to improve their techniques independently.

## How to use AIDEN

-   Allow browser access to microphone and camera
-   Say “start exercises” or press “Start” or any particular language ( translation )
-   Try to do a “back bend stretch” approximately 8 foot away from the webcam with whole body in frame like in demo video. (only works in one orientation currently)

## Technology

### Machine Learning - tensorflow.js

AIDEN uses a [tensorflow.js](https://www.tensorflow.org/js)  (browser-based) model to make predictions on the state of the current user's pose. It has been trained on a dataset of images created by us (~300 images per pose) to predict whether the position is correct, or incorrect - and what makes it so.
We have used Azure Machine Learning Studio, an Azure Machine Learning tool, to train our models in the various physiotherapy poses.
Azure Cognitive Services Speech-to-Text API was also used to enable the application to be accessible by the visually impaired. The user can start their exercises via speech in various languages using Azure Translator Speech API remotely and this is more convenient and easier to use for our target audience.
The application utilizes Azure Cognitive Services for text-to-speech. This is useful for the visually impaired as they can hear if they are in the right position as the application will tell them to adjust their posture if incorrect.

### Index.html

-   The index.html contains all the HTML that forms the backbone of the website.
-   We have used the bootstrap open-source CSS framework for our front-end development.

### Index.js

-   index.js contains the Javascript code for the web application. This works with HTML to add functionality to the site.
-   Loads the model and metadata and handles image data.
