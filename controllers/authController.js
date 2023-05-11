import userModel from "../models/userModel.js";

import { hashPassword } from "./../helpers/authHelper.js";

export const registerController = async (req,res) => {
    try{
        const {name, email, password, phone, address, answer } = req.body;

        //validations
        if(!name){
            return res.send({error: 'Name is Required'});
        }
        if(!email){
            return res.send({error: 'Email is Required'});
        }
        if(!password){
            return res.send({error: 'Password is Required'});
        }
        if(!phone){
            return res.send({error: 'Phone is Required'});
        }
        if(!address){
            return res.send({error: 'address is Required'});
        }
        if (!answer) {
            return res.send({ message: "Answer is Required" });
          }
            // most important to check
        //check user 
        const exisitinguser =  await userModel.findOne({email});
        
        //exisiting user
        if(exisitinguser){
            return res.status(200).send({
                success: false,
                message:"Already Register please Login",
            });
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password:hashedPassword,
            answer,
        }).save();

        res.status(201).send({
            success:true,
            message:"User Register Successfully",
            user,
        });


    }catch (error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Registration",
            error,
        });
    }
};

