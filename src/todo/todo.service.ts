import { Injectable } from '@nestjs/common'
import { Todo, TodoUpdate } from './todo.interface'

export class TodoService {
	private readonly storage: Todo[] = []

	getAll(): Todo[] {
		return this.storage
	}

	create(todo: Todo): Todo {
		if (this.storage.length) {
			const currentMaxId = Math.max(...this.storage.map((item: Todo) => item.id))
			todo.id = currentMaxId + 1
		} else {
			todo.id = 1
		}
		if (!todo.hasOwnProperty('complete')) {
			todo.complete = false
		}
		this.storage.push(todo)
		return todo
	}

	getOne(id: number): Todo {
		return this.storage.find((item: Todo) => item.id === id)
	}

	updateOne(id: number, todo: TodoUpdate): Todo {
		const index = this.storage.findIndex((item: Todo) => item.id === id)
		this.storage[index] = todo
		return this.storage[index]
	}

	deleteOne(id: number): void {
		const index = this.storage.findIndex((item: Todo) => item.id === id)
		this.storage.splice(index, 1)
	}
}
