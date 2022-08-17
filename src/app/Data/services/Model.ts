//Items:
export interface addItem {
    name:string,
    price:number,
    description:string
}

export interface getItem extends addItem {
    id:number
}

//Units:
export interface addUnit {
    name:string,
    isNumber:boolean
}

export interface getUnit extends addUnit {
    id:number
}

export interface itemModel {
    itemId:number,
    count:number,
    discount:number,
    price:number,
    apdTotalCost:number
}

export interface itemModelName extends itemModel{
    itemName:string,
    unitName:string,
    
}