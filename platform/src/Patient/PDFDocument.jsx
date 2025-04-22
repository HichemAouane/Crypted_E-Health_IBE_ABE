import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Styles
const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, fontWeight: 'bold' },
  text: { fontSize: 14 },
});

// PDF Document Component
const PDFDocument = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Medical Report</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Patient Name: {data.patientName}</Text>
        <Text style={styles.text}>Doctor: {data.doctor}</Text>
        <Text style={styles.text}>Date: {data.date}</Text>
        <Text style={styles.text}>Diagnosis: {data.diagnosis}</Text>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
