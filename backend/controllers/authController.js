const {teamCollection, applicantCollection, accountCollection} = require('../models/registrationschemas');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const creatingAccount = async (req, res, next) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);

    let existingUser = await accountCollection.findOne({ userName: req.body.userName });
    if (existingUser) {
      return res.status(409).json({ message: 'Username is already used!' });
    }

    const user = new accountCollection({
      userName: req.body.userName,
      password: hashedPass
    });

    user.save()
      .then(() => {
        res.status(200).json({
          message: 'Account Creation Successful!'
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const teamRegistration = (req, res, next) => {
          let team = new teamCollection ({
               userName: req.body.userName,
               teamName: req.body.teamName,
               projectTitle: req.body.projectTitle, 
               objective: req.body.objective,
               position: req.body.position,
               skillReq: req.body.skillReq,
               description: req.body.description,
               email: req.body.email
          })
          team.save()
               .then(team => {
                    res.json({
                         message: "Team registration Successful!"
                    })
               })
               .catch(err => { 
                    res.status(500).json({
                         error: err
                    })
               })

}

const applicantRegistration = (req, res, next) => {

          let applicant = new applicantCollection ({
               userName: req.body.userName,
               fullName: req.body.fullName,
               major: req.body.major, 
               semester: req.body.semester,
               expertise: req.body.expertise,
               skill: req.body.skill,
               description: req.body.description,
               portofolioLink: req.body.portofolioLink,
               email: req.body.email,

          })
          applicant.save()
               .then(() => {
                    res.status(200).json({
                         message: "Applicant registration Successful!"
                    })
               })
               .catch(err => { 
                    res.status(500).json({
                         error: err
                    })
               })
}

const teamLogin = (req, res, next) => {
     let teamname = req.body.teamNameLogin
     let password = req.body.passwordLogin

     teamCollection.findOne({teamName:teamname})
     .then(team =>{
          if (team){
               bcrypt.compare(password, team.password, (err, result) => {
                    if (err){
                         res.json({
                              message: err
                         }) 
                    }
                    if (result){
                         res.json({
                              message: 'Login Successful!'
                         }) 
                    } else{
                         res.json({
                              message: 'Wrong Password!'
                         }) 
                    }
               })
          } else{
               res.json({
                    message: 'No user found!'
               })
          }
     })
     
}

const applicantLogin = (req, res, next) => {
     let username = req.body.usernameLogin
     let password = req.body. 

     applicantCollection.findOne({userName:username})
     .then(applicant =>{
          if (applicant){
               bcrypt.compare(password, applicant.password, (err, result) => {
                    if (err){
                         res.json({
                              message: err
                         }) 
                    }
                    if (result){
                         res.json({
                              message: 'Login Successful!'
                         }) 
                    } else{
                         res.json({
                              message: 'Wrong Password!'
                         }) 
                    }
               })
          } else{
               res.json({
                    message: 'No user found!'
               })
          }
     })
     
}


module.exports = {creatingAccount, teamRegistration, applicantRegistration, teamLogin, applicantLogin};