export interface UserData{
    userName:string,
    age:number,
    hobbies:string[]
}

export interface User extends UserData{
    id:string,
}



