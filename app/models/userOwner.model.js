import fs from "fs/promises";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, "../common/userOwnerData.txt");


class UserOwnerModel {
    async createUser({
            name, 
            lastName,
            pet,
            neighborhood, 
            email, 
            password, 
        })
    {
        const existingOwnerData = await fs.readFile(filePath, "utf-8")
        const existingOwnerUser = JSON.parse(existingOwnerData || "[]");

        const existingEmail = existingOwnerUser.filter((user) => user.email === email);

        if(existingEmail[0]) {
            return { error: "Email alredy registered"};
        } else {
            const encryptedPassword = await bcrypt.hash(password, 10);
            const id = uuidv4();
            const userOwnerData = {
                id,
                firstName : name,
                lastName :  lastName,
                pet : pet,
                neighborhood : neighborhood,
                email: email.toLowerCase(),
                password : encryptedPassword,
            };

            existingOwnerUser.push(userOwnerData);

            await fs.writeFile(
                filePath,
                JSON.stringify(existingOwnerUser)
            );

            return userOwnerData;
        }
    }

    async findUser(email) {
        const existingOwnerData = await fs.readFile(filePath, "utf-8")
        const existingOwnerUser = JSON.parse(existingOwnerData || "[]");

        const user = existingOwnerUser.find((user) => user.email === email);

        if (!user) {
            return { error: "Email not registered"};
        } else {
            return user;
        }
    }
}

export default UserOwnerModel;

// const userOwnerModel = new UserOwnerModel ();

// userOwnerModel.createUser({
//     name: "Andres",
//     lastName: "Molina",
//     pet: "Uron",
//     neighborhood: "Belen",
//     email: "elprimo@gmail.com",
//     password: "123456"
// })
