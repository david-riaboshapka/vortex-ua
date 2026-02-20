
import { db } from "@/lib/db";
import Link from 'next/link'
import Projects_home from './components/projects';
import Faq from './components/Faq';
import Footer from './components/Footer';
import Requests from './components/Requests';
import Arsenal from './components/Arsenal';
import Header from './components/Header';
import Reviews from './components/ReviewsSection';
export default async function Home() {

  const { rows } = await db.query(
    ` 
    SELECT
      portfolio_projects.id,
      portfolio_projects.title,
      portfolio_projects.site_url,
      portfolio_images.image_url AS main_image
    FROM portfolio_projects
    LEFT JOIN portfolio_images
      ON portfolio_images.project_id = portfolio_projects.id
      AND portfolio_images.is_main = true
    ORDER BY portfolio_projects.id DESC;

  `
  );

  return (
    <>
      <Header />
      <main>
        <section>
          <div className="container">
            <h2>Our projects speak <span>for themselves</span></h2>
            <div className="project-cont">
              {rows.slice(0, 10).map(project => (
                <Link href={`/projects/${project.id}`} className="project-item" key={project.id}>
                  <h4>{project.title}</h4>
                  <img src={project.main_image} />
                </Link >
              ))}
            </div>
          </div>
        </section>
        <Projects_home />
        <Arsenal />


        <section className="process">
          <div className='container'>
            <h2 data-translate="process_title">How <span>We Work</span></h2>
            <div className="process-content">
              <div className="process-item">
                <img src="https://vortex-agency.com.ua/wp-content/themes/vortex/assets/img/01.png" alt="" />
                <p data-translate="process_step_1">Researching needs and defining a clear brief</p>
              </div>
              <div className="process-item">
                <img src="https://vortex-agency.com.ua/wp-content/themes/vortex/assets/img/02.png" alt="" />
                <p data-translate="process_step_2">Creating the concept and prototype</p>
              </div>
              <div className="process-item">
                <img src="https://vortex-agency.com.ua/wp-content/themes/vortex/assets/img/03.png" alt="" />
                <p data-translate="process_step_3">Discussing details and making adjustments</p>
              </div>
              <div className="process-item">
                <img src="https://vortex-agency.com.ua/wp-content/themes/vortex/assets/img/04.png" alt="" />
                <p data-translate="process_step_4">Developing design and functionality</p>
              </div>
              <div className="process-item">
                <img src="https://vortex-agency.com.ua/wp-content/themes/vortex/assets/img/05.png" alt="" />
                <p data-translate="process_step_5">Testing, reviewing, and optimizing</p>
              </div>
              <div className="process-item">
                <img src="https://vortex-agency.com.ua/wp-content/themes/vortex/assets/img/06.png" alt="" />
                <p data-translate="process_step_6">Presenting the final solution</p>
              </div>
              <div className="process-item">
                <img src="https://vortex-agency.com.ua/wp-content/themes/vortex/assets/img/07.png" alt="" />
                <p data-translate="process_step_7">Project launch and technical support</p>
              </div>
              <div className="process-item">
                <img src="https://vortex-agency.com.ua/wp-content/themes/vortex/assets/img/08.png" alt="" />
                <p data-translate="process_step_8">Delivering all materials and access</p>
              </div>
            </div>
          </div>
        </section>
        <Faq />
        <Reviews />
        <Requests />
      </main>

      <Footer />
    </>
  );
}
