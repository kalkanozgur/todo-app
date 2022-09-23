import "./App.css";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
	return (
		<section>
			<section class="todoapp">
				<Header />
				<Content />
			</section>
			<Footer />
		</section>
	);
}

export default App;
