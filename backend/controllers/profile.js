import { QueryTypes } from 'sequelize';
import db from '../config/database.js'

export const userprofile = async (req, res) => {
    try {
        const results = await db.query(
            "SELECT users.student_id, users.email, users.username, student_list.name from student_list JOIN users ON student_list.student_id = users.student_id", { type: QueryTypes.SELECT }
          );
            res.json(results);



        //const id = req.params.student_id;
        // const basicInfo = await User.findByPk(id, {
        //     attributes: {exclude: ['password']}}
        // );
        // db.query('select * from users where student_id=?',
        // [student_id],
        // (erre,results,fields)=>{
        //     if(error){
        //         console.log("error while getting user details"+error);
        //         res.send({
        //             "code": 400,
        //             "failed": "error occurred"
        //         });
        //     }
        //     else{
        //         if (results.length > 0) {
        //             const profile = results[0]
                   
        //             console.log(profile.id)
        //             res.render("profilepage",{user:profile});
        //             } else {
        //              console.log('unable to retrieve a profile')
        //             }
        //     }
        // })
        // res.json(basicInfo);

    } catch (error) {
        console.log(error);
    }
}