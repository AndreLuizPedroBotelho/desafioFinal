import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import api from '~/services/api';

import {
  Container,
  Table,
  LinkHref,
  Button,
  ContainerTitle,
  Wrapper,
} from './styles';

export default function Student() {
  const [students, setStudents] = useState([]);
  const [studentChange, setStudentChange] = useState();
  const [searchStudent, setSearchStudent] = useState();

  useEffect(() => {
    async function loadStudent() {
      const response = await api.get('student', {
        params: { q: searchStudent },
      });
      setStudents(response.data);
      setStudentChange(false);
    }

    loadStudent();
  }, [studentChange, searchStudent]);

  async function handleDelete(student) {
    Swal.fire({
      title: 'Confirmação',
      text: `Você gostaria de deletar o aluno ${student.name}?`,
      icon: 'question',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      showCancelButton: true,
      preConfirm: async () => {
        try {
          await api.delete(`student/${student.id}`, {});
          toast.success('Aluno deletado com sucesso');
          setStudentChange(true);
        } catch (err) {
          toast.error(
            'Não é possível deletar, existe matrícula vinculada a esse aluno'
          );
        }
      },
    });
  }

  return (
    <Container>
      <ContainerTitle>
        <span>Gerenciando alunos</span>
        <Wrapper>
          <Link to="/student/save">CADASTRAR</Link>
          <input
            placeholder="Buscar aluno"
            value={searchStudent}
            onChange={e => setSearchStudent(e.target.value)}
          />
        </Wrapper>
      </ContainerTitle>

      <Table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th>IDADE</th>
            <th className="actions" />
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td className="actions">
                  <LinkHref
                    to={`/student/save/${student.id}`}
                    light="true"
                    color="blue"
                  >
                    editar
                </LinkHref>
                  <Button color="red" onClick={() => handleDelete(student)}>
                    apagar
                </Button>
                </td>
              </tr>
            ))
          ) : (<tr><td>Não existe nenhum aluno no momento</td></tr>)}
        </tbody>
      </Table>
    </Container>
  );
}
