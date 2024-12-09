import React, { useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import Utility from "../utility/Utility";

interface HeaderTableInterface {
  field: string;
  header: string;
}

interface ITableComponentInterface {
  cols: HeaderTableInterface[];
  data: any[];
  actionParams: {
    edit: string;
    delete: string;
    seeDetail: string;
  };
  onClickDetail: (idArticle: string) => void;
  onClickEdit: (idArticle: string) => void;
  onClickDelete: (idArticle: string) => void;
}

export default function ITableComponent(props: ITableComponentInterface) {
  const dt = useRef(null);
  const toast = useRef<any>(null);

  const exportColumns = props.cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const exportCSV = (selectionOnly: boolean) => {
    // @ts-ignore
    dt?.current?.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default("l");
        doc.save("products.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(props.data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "products");
    });
  };

  const saveAsExcelFile = (buffer: BlobPart, fileName: string) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`
        );
      }
    });
  };

  // Action column body template
  const actionBodyTemplate = (rowData: any) => {
    const menu = useRef<any>(null);

    const items = [
      {
        label: "Detail",
        icon: "pi pi-eye",
        command: () => {
          props.onClickDetail(rowData[props.actionParams.seeDetail]);
        },
      },
      {
        label: "Edit",
        icon: "pi pi-pencil",
        command: () => {
          props.onClickEdit(rowData[props.actionParams.seeDetail]);
        },
      },
      {
        label: "Delete",
        icon: "pi pi-trash",
        command: () => {
          props.onClickDelete(rowData[props.actionParams.seeDetail]);
        },
      },
    ];

    return (
      <div className="flex justify-content-center">
        <Button
          icon="pi pi-ellipsis-v"
          className="p-button-rounded p-button-secondary"
          onClick={(e) => menu.current?.toggle(e)}
        />
        <Menu model={items} popup ref={menu} />
      </div>
    );
  };

  const publishDate = (rowData: any) => {

    return (
      <div className="flex justify-content-center">
        <p className="text-slate-700 dark:text-white ">
            {Utility.formatDate(rowData["publishedAt"])}
        </p>
      </div>
    );
  };

  const createdAt = (rowData: any) => {

    return (
      <div className="flex justify-content-center">
        <p className="text-slate-700 dark:text-white ">
            {Utility.formatDate(rowData["createdAt"])}
        </p>
      </div>
    );
    
  }


  const updatedAt = (rowData: any) => {

    return (
      <div className="flex justify-content-center">
        <p className="text-slate-700 dark:text-white ">
            {Utility.formatDate(rowData["updatedAt"])}
        </p>
      </div>
    );


  }

  const header = (
    <div className="flex align-items-center justify-content-end gap-2">
      <Button
        type="button"
        icon="pi pi-file"
        rounded
        onClick={() => exportCSV(false)}
        data-pr-tooltip="CSV"
      />
      <Button
        type="button"
        icon="pi pi-file-excel"
        severity="success"
        rounded
        onClick={exportExcel}
        data-pr-tooltip="XLS"
      />
      <Button
        type="button"
        icon="pi pi-file-pdf"
        severity="warning"
        rounded
        onClick={exportPdf}
        data-pr-tooltip="PDF"
      />
    </div>
  );

  return (
    <div className="card mt-4">
      <Tooltip target=".export-buttons>button" position="bottom" />
      <Toast ref={toast}></Toast>
      <DataTable
        ref={dt}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        value={props.data}
        header={header}
        tableStyle={{ minWidth: "50rem" }}
      >
        {props.cols.map((col, index) =>
          col.field === "action" ? (
            <Column
              key={index}
              field={col.field}
              header={col.header}
              body={actionBodyTemplate}
            />
          ) : col.field === "publishedAt" ? (
            <Column key={index} field={col.field} header={col.header} body={publishDate} />
          ) :   col.field === "createdAt" ? (
            <Column key={index} field={col.field} header={col.header} body={createdAt} />
          ) :   col.field === "updatedAt" ? (
            <Column key={index} field={col.field} header={col.header} body={updatedAt} />
          ) :  (
            <Column key={index} field={col.field} header={col.header} />
          )
        )}
      </DataTable>
    </div>
  );
}
