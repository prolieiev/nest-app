import { Controller, Get, Post, Body, Param, ParseIntPipe, Put, Delete, Logger } from '@nestjs/common'
import { TodoService } from './todo.service'
import { Todo, TodoUpdate } from './todo.interface'

@Controller('todo')
export class TodoController {
	private readonly logger = new Logger(TodoController.name)

	constructor(private readonly todoService: TodoService) {}

	@Get()
	getAll(): Todo[] {
		this.logger.log('Getting all to-do points')
		return this.todoService.getAll()
	}

	@Post()
	create(@Body() todo: Todo): Todo {
		this.logger.log('Creating to-do point')
		return this.todoService.create(todo)
	}

	@Get(':id')
	getOne(@Param('id', ParseIntPipe) id: number): Todo {
		this.logger.log('Getting to-do point')
		return this.todoService.getOne(id)
	}

	@Put(':id')
	updateOne(@Param('id', ParseIntPipe) id: number, @Body() todo: TodoUpdate): Todo {
		this.logger.log('Updating to-do point')
		return this.todoService.updateOne(id, todo)
	}

	@Delete(':id')
	deleteOne(@Param('id', ParseIntPipe) id: number): void {
		this.logger.log('Deleting to-do point')
		this.todoService.deleteOne(id)
	}
}
