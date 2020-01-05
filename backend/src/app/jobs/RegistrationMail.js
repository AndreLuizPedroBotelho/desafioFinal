import Mail from '../../lib/Mail';

class Registration {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const {
      studentName,
      studentId,
      price,
      studentEmail,
      planTxt,
      endDate,
    } = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${studentName} <${studentEmail}>`,
      subject: 'Confirmação Matricula',
      template: 'registration',
      context: {
        studentName,
        price,
        studentId,
        planTxt,
        endDate,
      },
    });
  }
}

export default new Registration();
