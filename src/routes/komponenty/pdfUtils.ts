import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface User {
  imie: string;
  nazwisko: string;
  stanowisko: string;
}

interface LogEntry {
  _id: string;
  date: string; // Format daty: yyyy-mm-dd
  entrence_time: string;
  exit_time: string;
  hours: string;
  comment?: string; // Komentarz jest opcjonalny
  historia_komentarza?: string;
}

function filterLogsByMonth(logs: LogEntry[], year: number, month: number): LogEntry[] {
  return logs.filter(log => {
    const logDate = new Date(log.date);
    return logDate.getFullYear() === year && logDate.getMonth() === month;
  });
}

function sumHours(logs: LogEntry[]): string {
  let totalMinutes = logs.reduce((sum, log) => {
    const [hours, minutes] = log.hours.split(':').map(Number);
    return sum + hours * 60 + minutes;
  }, 0);

  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  return `${totalHours}:${remainingMinutes.toString().padStart(2, '0')}`;
}

export function generatePDF(selectedUser: User, logowania: LogEntry[], year: number, month: number) {
  const filteredLogs = filterLogsByMonth(logowania, year, month);
  const totalHours = sumHours(filteredLogs);

  const docDefinition = {
    content: [
      { text: `Łubnice, dnia ${new Date().toLocaleDateString()}`, alignment: 'right', margin: [0, 0, 0, 10] },
      { text: 'Raport miesięczny', fontSize: 16, margin: [0, 0, 0, 10] },
      { text: `Użytkownik: ${selectedUser.imie} ${selectedUser.nazwisko}`, margin: [0, 0, 0, 5] },
      { text: `Stanowisko: ${selectedUser.stanowisko}`, margin: [0, 0, 0, 10] },
      {
        table: {
          headerRows: 1,
          widths: [100, '*', '*', '*', '*'],
          body: [
            ['Data', 'Godzina wejścia', 'Godzina wyjścia', 'Godziny', 'Komentarz'],
            ...filteredLogs.map(log => [
              log.date,
              log.entrence_time,
              log.exit_time,
              log.hours,
              log.comment || ''
            ])
          ]
        },
        layout: 'lightHorizontalLines'
      },
      {
        text: '_______________________________________________________________________________________________',
        margin: [0, 10, 0, 10]
      },
      { text: `Suma godzin: ${totalHours}`, alignment: 'right', margin: [0, 0, 0, 50] },
      { text: ' ', margin: [0, 100, 0, 0] }, // Adds a blank space to push the footer to the bottom
    ],
    footer: function(currentPage, pageCount) {
      return {
        columns: [
          { text: '___________________________________________________________________________________________________________________', margin: [0, 10, 0, 10] },
          { text: 'Raport generowany automatycznie', fontSize: 10, alignment: 'center', margin: [0, 10, 0, 0] }
        ],
        margin: [0, 0, 0, 10] // Adjusts the bottom margin of the footer
      };
    }
  };

  pdfMake.createPdf(docDefinition).download('logowania.pdf');
}
