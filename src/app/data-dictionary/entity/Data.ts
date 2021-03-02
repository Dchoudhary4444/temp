export class Data {

  id: number;
  citiApplicationName: string;
  dbInstanceName: string;
  dbSchemaName: string;
  tableName: string;
  columnName: string;
  columnDataType: string;
  columnDescription: string;
  minimumCharactersLength: number;
  priorityTable: string;
  positionalOrderNo: number;
  attributeInDataLake: string;
  targetTableName: string;
  targetColumnName: string;
  isStatic: string;
  staticValue: string;

  constructor() {

    this.id = 0;
    this.citiApplicationName = "";
    this.dbInstanceName = "";
    this.dbSchemaName = "";
    this.tableName = "";
    this.columnName = "";
    this.columnDataType = "";
    this.columnDescription="";
    this.minimumCharactersLength=0;
    this.priorityTable = "";
    this.positionalOrderNo=0;
    this.attributeInDataLake = "";
    this.targetTableName = "MST_";
    this.targetColumnName = "";
    this.isStatic = "";
    this.staticValue = "";
  }
}
