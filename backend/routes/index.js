const express = require('express');
const router = express.Router();
const {
     teamRegistration, 
     applicantRegistration, 
     userLogin,
     creatingAccount
} = require('../controllers/authController')

const {
     detailTeam,
     detailApplicant,
     delTeamAccount,
     delApplicantAccount,
     editTeamDetail,
     editApplicantDetail
} = require('../controllers/profileController')

const {
     addingMatched,
     gettingMatches,
     deleletingMatch
} = require('../controllers/matchedController')

const {
     applicantBySkillReq
} = require('../controllers/homeController')

router.get('/test', (req, res) => {
     res.send('Welcome to TeamSekeer API');
});

router.post('/registerteam', teamRegistration);
router.post('/registerapplicant', applicantRegistration);
router.post('/userlogin', userLogin);
router.get('/detailteam/:username', detailTeam);
router.get('/detailapplicant/:username', detailApplicant);
router.delete('/delteam/:username', delTeamAccount);
router.delete('/delapplicant/:username', delApplicantAccount);
router.put('/editteamdetail/:username', editTeamDetail);
router.put('/editapplicantdetail/:username', editApplicantDetail);
router.get('/home/:username', applicantBySkillReq);
router.post('/createaccount', creatingAccount);

router.post('/matched', addingMatched)
router.post('/matches', gettingMatches)

router.delete('/delmatch', deleletingMatch)



module.exports = router;