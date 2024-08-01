import { IsNotEmpty, IsUUID, ArrayMinSize, IsArray} from 'class-validator';



export class CreateOrderDto {

@IsUUID()
@IsNotEmpty()
userId: string;

@IsArray()
@ArrayMinSize(1)
@IsUUID(undefined, { each: true })
productIds: string[];
}