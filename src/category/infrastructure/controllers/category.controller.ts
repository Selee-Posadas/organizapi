import { Body, Controller, Delete, ForbiddenException, Get, InternalServerErrorException, NotFoundException, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/infrastructure/guards/auth.guard';
import { CreateCategoryUseCase } from 'src/category/application/use-cases/create-category.use-case';
import { DeleteCategoryUseCase } from 'src/category/application/use-cases/delete-category.use-case';
import { FindAllCategoryUseCase } from 'src/category/application/use-cases/find-all-category.use-case';
import { FindCategoryByIdUseCase } from 'src/category/application/use-cases/find-by-id-category.use-case';
import { UpdateCategoryUseCase } from 'src/category/application/use-cases/update-category.use-case';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly updateCategoryUseCase: UpdateCategoryUseCase,
        private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
        private readonly createCategoryUseCase: CreateCategoryUseCase,
        private readonly findAllCategoryUseCase: FindAllCategoryUseCase,
        private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase,
    ) { }

    @Get()
    @UseGuards(AuthGuard)
    async findAll(@Req() req) {
        try {
            const categories = await this.findAllCategoryUseCase.execute(req.user.id);
            return categories;
        } catch (error) {
            this.handleErrors(error);
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async findOne(
        @Param('id') categoryId: string,
        @Req() req
    ) {
        try {
            const category = await this.findCategoryByIdUseCase.execute(categoryId, req.user.id);
            return category;
        } catch (error) {
            this.handleErrors(error);
        }
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Req() req, @Body() createCategoryDto: CreateCategoryDto) {
        try {
            const category = await this.createCategoryUseCase.execute(createCategoryDto, req.user.id);
            return {
                message: 'Category created successfully',
                category,
            };
        } catch (error) {
            this.handleErrors(error);
        }
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    async update(
        @Param('id') categoryId: string,
        @Req() req,
        @Body() updateCategoryDto: UpdateCategoryDto
    ) {
        try {
            const category = await this.updateCategoryUseCase.execute(categoryId, req.user.id, updateCategoryDto,);
            return {
                message: 'Category updated successfully',
                category,
            };
        } catch (error) {
            this.handleErrors(error);
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async delete(
        @Param('id') categoryId: string,
        @Req() req
    ) {
        try {
            await this.deleteCategoryUseCase.execute(categoryId, req.user.id);
            return {
                message: 'Category deleted successfully',
            };
        } catch (error) {
            this.handleErrors(error);
        }
    }

    private handleErrors(error: any) {
        if (error.message === 'Category not found') {
            throw new NotFoundException(error.message);
        }
        if (error.message.includes('permission')) {
            throw new ForbiddenException(error.message);
        }

        throw new InternalServerErrorException('An unexpected error occurred');
    }
}
