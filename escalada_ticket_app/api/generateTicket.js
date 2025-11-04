import { PDFDocument, rgb } from "pdf-lib";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, email } = req.body;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([400, 250]);

    page.drawText(`Эскалада, Totma, X-Caro | Ставрополь`, { x: 50, y: 200, size: 14, color: rgb(0, 0, 0) });
    page.drawText(`Дата: 6 декабря 2025, Время: 19:00`, { x: 50, y: 180, size: 12 });
    page.drawText(`Площадка: Rock Bar, Ул. Пирогова 63Б, Ставрополь`, { x: 50, y: 160, size: 12 });
    page.drawText(`Имя: ${firstName}`, { x: 50, y: 130, size: 12 });
    page.drawText(`Фамилия: ${lastName}`, { x: 50, y: 110, size: 12 });
    page.drawText(`Email: ${email}`, { x: 50, y: 90, size: 12 });
    page.drawText(`Цена билета: 500₽`, { x: 50, y: 70, size: 12 });
    page.drawText(`Билет действителен только при предъявлении.`, { x: 50, y: 50, size: 10 });

    const pdfBytes = await pdfDoc.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=Билет_Эскалада.pdf");
    res.send(Buffer.from(pdfBytes));
  } else {
    res.status(405).json({ message: "Метод не разрешен" });
  }
}