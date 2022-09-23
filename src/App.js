import { Form, Formik } from 'formik';
import styled from 'styled-components';
import './App.css';
import Input from './components/Input/Input';
import Button from './components/Button/Button';

export default function App() {
	return (
		<Container>
			<Section>
				<Formik initialValues={{ deposit: '', contribution: '', years: '', rate: '' }} onSubmit={handleSubmit}>
					<Form>
						<Input name='deposit' label='Deposito inicial' />
						<Input name='contribution' label='Contribucion anual' />
						<Input name='years' label='Anios' />
						<Input name='rate' label='Interes estimado' />
						<Button>Calcular</Button>
					</Form>
				</Formik>
			</Section>
		</Container>
	);
}

function handleSubmit() { }

const Container = styled.div`
	display:flex;
	justify-content:center;
	height:100%;
	align-items:center;
`;

const Section = styled.section`
	background-color: #EEE;
	border-top: solid 2px palevioletred;
	padding: 20px 25px;
	width: 500px;
	box-shadow: 0px 2px 3px rgb(0, 0, 0, 0.3);
	
`;