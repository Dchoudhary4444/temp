import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'sort', pure: false })
export class SortPipe implements PipeTransform {
  transform(items: any[], direction: string, propName: string, propDataType: string) {
    //console.log("transform ", tableData,direction,propName,propDataType);

    let sortedItems = [];
    sortedItems = direction === "asc" ?
      this.sortAscending(items, propName, propDataType) :
      this.sortDescending(items, propName, propDataType)
    return sortedItems;
  }
  sortAscending(items: any, propName: any, propDataType: any) {
    return [...items.sort((a: any, b: any) => {
      // if (propDataType === "string") {
      //  return x == y ? 0 : x > y ? 1 : -1;

      if (a[propName] < b[propName])
        return -1;
      else
        return null;
      // return null;
      // }
      // else {
      //   return a[propName] - b[propName];
      // }
    })]
  }
  sortDescending(items: any, propName: any, propDataType: any) {
    return [...items.sort((a: any, b: any) => {
      if (propDataType === "string") {
        if (a[propName] > b[propName]) {
          console.log(a[propName], " sc ", b[propName]);
          return -1;
        }
        return null;
      }
      else {
        return b[propName] - a[propName];
      }
    })]
  }
}
