import "./App.css";
import Content from "./components/Content";
import ContentFooter from "./components/ContentFooter";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
	return (
		<section>
			<section className="todoapp">
				<Header />
				<Content />
				<ContentFooter />
			</section>
			<Footer />
		</section>
	);
}

export default App;
