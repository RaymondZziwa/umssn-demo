let pool = require('../../database/dbConnection').pool;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const loginController = (req,res)=>{
    const branch = req.body.branch
    const username = req.body.username
    const department = req.body.department
    const role = req.body.role
    const password = req.body.password
    // console.log(`parameters passed are ${department} and ${username} and ${password}`)

    //check if the parameters are not empty
    if (branch === 'masanafu') {
        if (department !== '' && role !== '' && username !== '' && password !== '') {
            //query that will seek out the details if they exist in that particular department
            pool.query('SELECT * FROM users WHERE branch= ? AND username= ? AND role=? AND department = ?;', [branch, username, role, department], (error, results) => {
                //if the query is faulty , throw the error
                if (error) console.log(error);
                //if account exists
                if (results.length > 0) {
                    bcrypt.compare(password, results[0].password, (error, response) => {
                        if (error) throw error;
                        if (response) {
                            const token = jwt.sign({
                                username: results[0].username,
                                userpassword: results[0].password,
                            }, 'SECRETKEY', {
                                expiresIn: '1d'
                            }
                            );
                            res.send({
                                token,
                                user: results[0].username,
                                branch: branch,
                                department: department,
                                role: role,
                                redirectPath: `/${role}dashboard`
                            })
                        } else {
                            res.send('Incorrect details.Please try again.');
                        }
                    })
                } else {
                    res.send('User does not exist.Contac t the system admin.')
                }
            })
        }
    }
    else if (branch !== '' && username !== '' && password !== '') {
        //query that will seek out the details if they exist in that particular department
        pool.query('SELECT * FROM users WHERE branch= ? AND username= ?;', [branch, username], (error, results) => {
            //if the query is faulty , throw the error
            if (error) console.log(error);
            //if account exists
            if (results.length > 0) {
                bcrypt.compare(password, results[0].password, (error, response) => {
                    if (error) throw error;
                    if (response) {
                        const token = jwt.sign({
                            username: results[0].username,
                            userpassword: results[0].password,
                        }, 'SECRETKEY', {
                            expiresIn: '1d'
                        }
                        );
                        res.send({
                            token,
                            user: results[0].username,
                            branch: results[0].branch,
                            department: results[0].department,
                            role: role,
                            redirectPath: `/${branch}dashboard`
                        })
                    } else {
                        res.send('Incorrect details.Please try again.');
                    }
                })
            } else {
                res.send('User does not exist.Contact the system admin.')
            }
        })
    }
}

module.exports = {loginController}