import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Laura Bokkers",
            "email": "laurabokkers@hotmail.com",
            "role": "ENGINEER",
        },
        {
            "id": 2,
            "name": "Rami Wohl",
            "email": "ramiwohl@hotmail.com",
            "role": "ADMIN",
        },
        {
            "id": 3,
            "name": "Claus",
            "email": "claus@claus.de",
            "role": "INTERN",
        },
        {
            "id": 4,
            "name": "BURT",
            "email": "burt@bees.com",
            "role": "ADMIN",
        },
        {
            "id": 5,
            "name": "Philodendron",
            "email": "philodendron@plantman.com",
            "role": "INTERN",
        },
    ]



    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.users.filter(user => user.role === role)
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        return user
    }

    create(user: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }


    update(id: number, updatedUser: { name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updatedUser }
            }
            return user
        })
        return this.findOne(id)
    }


    delete(id: number) {
        const removedUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id)

        return removedUser
    }
}
