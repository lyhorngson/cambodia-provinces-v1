import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Controller('province')
export class ProvincesController {
  @Get(':provinceName')
  getProvince(@Param('provinceName') provinceName: string) {
    const filePath = join(process.cwd(), 'public', 'data', 'province', `${provinceName}.json`);
    try {
      const jsonData = readFileSync(filePath, 'utf8');
      return JSON.parse(jsonData);
    } catch (error) {
      throw new NotFoundException(`Province ${provinceName} not found`);
    }
  }

  @Get()
  getProvinces() {
    const filePath = join(process.cwd(), 'public', 'data', 'provinces.json');
    try {
      const jsonData = readFileSync(filePath, 'utf8');
      return JSON.parse(jsonData);
    } catch (error) {
      throw new NotFoundException('Provinces data not found');
    }
  }
}