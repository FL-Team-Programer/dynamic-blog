
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { forEach } = require("lodash");
const _ = require('lodash');

const homeStartingContent = "This is a quick project that created with HTML, CSS, Bootstrap, node.js, express, ejs, body-parser and lodash. It simulates a blog page that the admin with just a click can write and upload his own blogs. The Home page just show titles and the first words of each post with a 'read more' link. Every post is the same .ejs page that changes the content (title, text) with variables that passed from the app.js file. The url of the posts is the title of each post and the url changes accordingly, additional when the user try to find a post (/posts/...) the program checks the array of the objects and if the post exists everything works fine otherwise it shows on the screen 'Post not found'.";
const aboutContent = "<br>Welcome to YOUR BLOG! We're thrilled to have you here on our platform, a dynamic space where voices from all walks of life converge to share their unique perspectives, thoughts, and ideas. Our mission is to provide a welcoming and inclusive platform for individuals like you to express themselves freely and engage in meaningful discussions. Whether you're a seasoned writer or a first-time contributor, you'll find a home here to share your stories, insights, and expertise. <br><br> At YOUR BLOG, we believe in the power of community, and that's why we've also created a newsletter that allows us to stay connected. By subscribing, you'll be the first to receive updates, thought-provoking articles, and exciting announcements directly in your inbox. Our commitment to fostering a vibrant and diverse community of writers and readers is at the heart of everything we do. <br><br>Thank you for being a part of our journey, and we can't wait to embark on this exciting adventure together. So go ahead, explore, write, share, and subscribe to be a part of our ever-growing family. Together, we can make this platform a hub of inspiration, learning, and creativity.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const postTitle0 = "The Art Of Programing"
const postContent0 = "Programming has been around for a long time, but it's in the last decade that its importance has really come to the forefront of the public consciousness. As the world gets increasingly digital, the ability to write code and understand programming has become a valuable asset, and one that many aspire to learn. But what exactly is programming?\n\n How does one become proficient in the art of programming?<br><br> At its core, programming is the process of writing code in a specific language. This code describes instructions for a computer or other device to perform. It functions as a kind of algorithm, guiding the computer to accomplish various operations, such as organizing data, running calculations, and retrieving information. There are a slew of different programming languages, ranging from web development languages like JavaScript and HTML/CSS to enterprise-level languages like Java and C++.<br><br> For newbies wanting to learn programming, the first step is to choose a language. Some may find it useful to start with a simpler language like Python, while others may opt to jump right into an intermediate language like JavaScript. Once a language has been selected,next comes the practice. Writing code takes practice, and lots of it. To become proficient, one must master the basics of a language"

const postTitle1 = "test1"
const postContent1 = "Programming has been around for a long time, but it's in the last decade that its importance has really come to the forefront of the public consciousness. As the world gets increasingly digital, the ability to write code and understand programming has become a valuable asset, and one that many aspire to learn. But what exactly is programming?\n\n How does one become proficient in the art of programming?<br><br> At its core, programming is the process of writing code in a specific language. This code describes instructions for a computer or other device to perform. It functions as a kind of algorithm, guiding the computer to accomplish various operations, such as organizing data, running calculations, and retrieving information. There are a slew of different programming languages, ranging from web development languages like JavaScript and HTML/CSS to enterprise-level languages like Java and C++.<br><br> For newbies wanting to learn programming, the first step is to choose a language. Some may find it useful to start with a simpler language like Python, while others may opt to jump right into an intermediate language like JavaScript. Once a language has been selected,next comes the practice. Writing code takes practice, and lots of it. To become proficient, one must master the basics of a language"

const postTitle2 = "test2"
const postContent2 = "Programming has been around for a long time, but it's in the last decade that its importance has really come to the forefront of the public consciousness. As the world gets increasingly digital, the ability to write code and understand programming has become a valuable asset, and one that many aspire to learn. But what exactly is programming?\n\n How does one become proficient in the art of programming?<br><br> At its core, programming is the process of writing code in a specific language. This code describes instructions for a computer or other device to perform. It functions as a kind of algorithm, guiding the computer to accomplish various operations, such as organizing data, running calculations, and retrieving information. There are a slew of different programming languages, ranging from web development languages like JavaScript and HTML/CSS to enterprise-level languages like Java and C++.<br><br> For newbies wanting to learn programming, the first step is to choose a language. Some may find it useful to start with a simpler language like Python, while others may opt to jump right into an intermediate language like JavaScript. Once a language has been selected,next comes the practice. Writing code takes practice, and lots of it. To become proficient, one must master the basics of a language"


//newsletter
const app = express();

//const request = require("request");

const client = require("@mailchimp/mailchimp_marketing");
client.setConfig({
  apiKey: "13a9890e282fe5a353be5b32a6f3a294-us14",
  server: "us14",
});
//

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("imgs"));

var posts = [{title: postTitle0,text: postContent0}, {title: postTitle1,text: postContent1}];
let search = "";

app.get('/', (req, res) => { 
  
  res.render(__dirname + '/views/home.ejs', {
    paragraph: homeStartingContent,
    allPosts: posts
  });

  
});

app.get('/about', (req, res) => { 
  
  res.render(__dirname + '/views/about.ejs', {
    paragraph: aboutContent
  });
  
});

//newsletter
app.get('/newsletter', (req, res) => {

  res.render(__dirname + "/views/newsletter.ejs");

});

app.post('/newsletter', (req,res)=>{

  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  
// Perni tis times apo tin forma kai tis bazi stis times tou object subscribingUser meta trexi mia asinxroni function i opia prostheti list member me tis times pou exo
  const listId = "69239302a7";
  const subscribingUser = {
  firstName: firstname,
  lastName: lastname,
  email: email
  };
  async function run() {
    const response = await client.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
      //Elenxi an to email exi egrafi sto mailchimp kai emfanizi sto antistixo minima stin konsola
    }).then(
      (value) => {
          console.log("Successfully added contact as an audience member. Status: " + value.status);
          res.redirect("/");
          
      },
      (reason) => {
          console.log("Error: " + reason.status);
          //alert(reason.status)
          res.redirect("/");
      },
      );
  }

  run();

});
//

app.get('/contact', (req, res) => { 
  
  res.render(__dirname + '/views/contact.ejs', {
    paragraph: contactContent
  });
  
});

app.get('/compose', (req, res) => { 
  
  res.render(__dirname + '/views/compose.ejs');
  
});

app.post('/compose', (req, res) => {


  const post = {title: req.body.postTitle,
          text: req.body.postText
    };

    posts.push(post)
    
    res.redirect("/");

})


app.post('/search', (req, res) => {

  search = req.body.search;

  console.log("Searching..");
  res.redirect("/search");

})

app.get('/search', (req, res) => { 
  
  res.render(__dirname + '/views/search.ejs', {
    allPosts: posts,
    searchTerm: search
  });

})




app.get('/posts/:post', (req, res) => {
  
  let wrongCell = 0;

  posts.forEach((Cell)=>{

    if(_.lowerCase(Cell.title) == _.lowerCase(req.params.post)){

      res.render(__dirname + '/views/post.ejs', {
        title: Cell.title,
        text: Cell.text
        
      });
      
      
    }else{
      wrongCell = wrongCell + 1;
    }

    //Diaxirisi se periptosi pou den brethito url /posts/:post
    if(posts.length == wrongCell){
      res.send("Post not found");
    }

  });


});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
