export const baseUrl : string = 'https://localhost:44303/api/';
export enum SupplierEndPoint
 {
    GetAllSupplier = 'Supplier/Get',
    Add = 'Supplier/Add',
    Update = 'Supplier/Update',
    Delete = 'Supplier/Delete?id=',
 };

export enum ManagerEndPoient 
{
  GetAllManger ='Manager/Get',
    post ='Manager/Register',
    Post='Manager/Login',

};

export enum LoginEndPoient 
{
  Post='Manager/Login',
};

export enum AddressEndPoient 
{
  get='Address/Get',
};

export enum InvoicesEndPoient 
{
    get='Invoice/Invoice',
    post ='Invoice/Invoice',
    delete ='Invoice/Delete?id=',

};

export enum StockEndPoient 
{
    get='Invoice/Stock',
};

export enum UnitsEndPoient 
{
    get='Units/Get',
    post='Units/Add',
    put='Units/Update',
    delete='Units/Delete?id=',

};

export enum ItemsEndPoient 
{
    get='Items/Get',
    post='Items/Add',
    update='Items/Update',
    delete='Items/Delete?id=',

};

export enum ConsumingEndPoient 
{
    get='Invoice/Consuming',
    post='Invoice/Consuming',
};

export enum ItemsStockEndPoient 
{
    get='Invoice/GetItemsStock',
};

export enum ReportEndPoient 
{
    post='Invoice/FullReport',
};