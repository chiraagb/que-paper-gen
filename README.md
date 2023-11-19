# Random Question Paper Generator using Node.js and Express.js

# Steps to run the application
 1) Make Sure You have Node.js installed on your machine
    `node --version`
 2) If yes type the below command to install necessary node modules
    `npm install`
 3) I have uploaded the .env file too which contains my mongodb connection key
 4) Run the below command to start the server at port 3000
    `npx nodemon`
 5) Go to your browser and type localhost:3000 to see the home page

# Explanation of the application
 1) On Home page you'll see the following screen.  You may click on Create Questions to create more questions or simply Generate Random Questions according to the input provided ![image](https://github.com/chiraagb/que-paper-gen/assets/113826990/22bae6fa-71ce-4dd9-8ecd-0351662336a9)
 2) On `localhost:3000/create-que` , I have added the Schema as follows where question must be unique and all the input fields should be provided.if the input fields are empty and we click on the create questions button it will take you to the beautiful error page and display the corresponding error which is achieved by using ejs. The document is stored in the mongodb database in JSON format. 
                                                                          `question: {
                                                                          type: String,
                                                                          required: true,
                                                                          unique: true,
                                                                        },
                                                                        subject: {
                                                                          type: String,
                                                                          required: true,
                                                                        },
                                                                        topic: {
                                                                          type: String,
                                                                          required: true,
                                                                        },
                                                                        difficulty: {
                                                                          type: String,
                                                                          required: true,
                                                                        },
                                                                        marks: {
                                                                          type: Number,
                                                                          required: true,
                                                                        },`
    
 3) Also, Questions must be unique, same subject can have many unique questions,same topic can have many unique questions. Therefore only the `question` attribute is made unique.And on clicking the create question button you'll be redirected to Home page
 4) On `localhost:3000/gen-que`, you'll see the following screen. you can either create more questions or generate questions based on the data we have created. The create-que data is stored in the JSON format.   ![image](https://github.com/chiraagb/que-paper-gen/assets/113826990/366a1b98-0f9c-4f45-815f-a9a29c7f6ae6)
 5) Here, we are not storing the `localhost:3000/gen-que` data on the database. We'll simply send the response back to the client(i.e, web browser).
 6) Some constraints to keep in mind:  
    a) The `total` should add up to the difficulty `easy+medium+hard` percentages else a response `["Values don't add upto total]` will be sent.  
    b) We should have the data on the database with enough marks such that they add up to the individual difficulty marks.  
    c) For example, totalMarks is 100 out of which 20% are easy i.e, 20 marks are of easy question, 50% are medium i.e, 50 marks are of easy question, 30% are hard i.e., 30 marks are of hard questions.So we should have the data that adds upto 20 for wasy, 50 for medium, 30 for hard marks in the database.  
    d) Response would be sent in the JSON format to the client (i.e., Web Browser)  
    e) If you dont see the response, install the JSON Viewer extension in your browser  
        i) For Chrome : [CLick Here](https://chromewebstore.google.com/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh)


# How the Questions are generated Randomly?
  1) we'll shuffle the array before implementing the actual function.
  2) First we'll find the objects in the document with the individual difficulty (easy,medium,hard), then'll we'll shuffle the array
  3) Then we take the marks of each difficulty and store it in the array : marksArray_easy, num_e is the size of the array with easy marks, ret[] is the new array, marks_easy is the array of objects where difficulty is easy, easy_que = totalM - (mediumPercentage + hardPercentage); and totalM = easyPercentage + mediumPercentage + hardPercentage;,  See the logic below
  4) ```
     async function generateQuestions(totalMarks,easyPercentage,mediumPercentage,hardPercentage) {
     ....
        for (let i = 0; i < marksArray_easy.length; i++) {
            if (easy_que >= marksArray_easy[i] && num_e > 0) {
              ret[j] = marks_easy[i];
              easy_que -= marksArray_easy[i];
              num_e--;
              j++;
            } else {
            }
          }
        ret = ret.filter((element) => element !== null);
     ....
     }
     ```
5) For more clarity, i have implemented the function in generate.js file
