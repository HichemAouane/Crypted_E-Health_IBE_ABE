import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "./PDFDocument";

const PDFDownload = ({ medicalData }) => (
  <div>
    <PDFDownloadLink document={<PDFDocument data={medicalData} />} fileName="Medical_Report.pdf">
      {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
    </PDFDownloadLink>
  </div>
);

export default PDFDownload;