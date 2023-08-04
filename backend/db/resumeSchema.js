const mongoose = require("mongoose");
const resumeSchema = new mongoose.Schema({
 
  user_id: {
    type: String,
    required: true,
  },
  basic_detail: 
        [
          { 
            image: { type: String } ,
            firstname: { type: String } ,
            lastname: { type: String } ,
            email: { type: String } ,
            phone: { type: String } ,
            address: { type: String } ,
            city: { type: String } ,
            pincode: { type: String } ,
            about: { type: String } ,
            linkedin:{ type: String } ,
            facebook:{ type: String } ,
            instagram:{ type: String } ,
            twitter:{ type: String } ,
            website:{ type: String } ,
            github:{ type: String } ,
          }
        ],
  education: 
        [
          { 
            college: { type: String } ,
            startdate: { type: String } ,
            enddate: { type: String } ,
            qual: { type: String } ,
            desc: { type: String } 
          }
        ],
  experience: 
        [
          { 
            institute: { type: String } ,
            position: { type: String } ,
            duration: { type: String } ,
            desc: { type: String } 
          }
        ],
  projects: 
        [
          { 
            title: { type: String } ,
            link: { type: String } ,
            role: { type: String } ,
            period: { type: String } ,
            projectDescription: { type: String } 
          }
        ],
  skills: 
        [
          { 
            skill1: { type: String },
            skill2: { type: String },
            skill3: { type: String },
            skill4: { type: String },
            skill5: { type: String },
            interest1: {type: String},
            interest2: {type: String},
            interest3: {type: String},
            interest4: {type: String},
            interest5: {type: String},
          }
        ],


});
module.exports = mongoose.model("resume", resumeSchema);
