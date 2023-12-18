import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
// import { users } from 'src/db';
import { UserData, User } from 'src/db';
import * as fs from 'fs'
import {v4 as uuid} from 'uuid'
import {join} from 'path'

@Injectable()
export class UsersService {
    dbPath:string
    constructor() {
        this.dbPath = join(process.cwd(),'db.json')
        console.log(this.dbPath);
        
    }
    private getDbData():User[]{
        try {
            let db = JSON.parse(fs.readFileSync(this.dbPath, 'utf-8'))
            return db
        } catch (error) {
            Logger.error(error.message)
            throw new InternalServerErrorException('Something went wrong')
        }
    }
    getUsers():User[]{
        return this.getDbData()
    }

    getUser(userId:string):User{
        const dbData = this.getDbData()
        const userIndex = dbData.findIndex(d => d.id == userId)
        if(userIndex === -1) throw new NotFoundException('User not found')
        return dbData[userIndex]
    }

    addUser(userData:UserData):User{
        try {
        let db = this.getDbData()
        const user = {id:uuid(),...userData}
        db.push(user)
        const data = JSON.stringify(db)
        fs.writeFileSync(this.dbPath, data,'utf-8')
        return user
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong')
        }

    }

    updateUser(userId:string, updatedObj:Partial<User>):User{
        try {
            const dbData = this.getDbData()
            const userIndex = dbData.findIndex(d => d.id == userId)
            if(userIndex === -1) throw new NotFoundException('User not found')
            const user = dbData[userIndex]
            Object.assign(user, updatedObj)
            dbData[userIndex] = user
            fs.writeFileSync(this.dbPath, JSON.stringify(dbData), 'utf-8')
            return user 
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong')
        }

    }

    deleteUser(userId:string):User{
        try {
            const dbData = this.getDbData()
            const userIndex = dbData.findIndex(d => d.id == userId)
            if(userIndex === -1) throw new NotFoundException('User not found')
            const user = dbData[userIndex]
            const data = dbData.filter(d => d.id !== userId)
            fs.writeFileSync(this.dbPath, JSON.stringify(data), 'utf-8')
            return user 
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong')
        }
    }
}
