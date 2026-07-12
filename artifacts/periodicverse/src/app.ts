import { initHero } from './components/hero';
import { initParticles } from './components/particles';
import { initNav } from './components/nav';
import { initPeriodicTable } from './components/table';
import { initCompare } from './components/compare';
import { initElementOfDay } from './components/elementOfDay';
import { initTimeline } from './components/timeline';
import { initQuiz } from './components/quiz';
import { initFacts } from './components/facts';
import { initFAQ } from './components/faq';
import { initTeam } from './components/team';
import { initFooter } from './components/footer';
import { initModal } from './components/modal';
import { initScrollReveal } from './utils/animations';

export function initApp(root: HTMLElement) {
    root.className = "app-container";
    root.innerHTML = `
        <div id="particle-canvas"></div>
        <nav id="nav"></nav>
        <header id="hero"></header>
        <section id="periodic-table-section" class="reveal"></section>
        <section id="compare-section" class="reveal"></section>
        <section id="element-of-day" class="reveal"></section>
        <section id="timeline" class="reveal"></section>
        <section id="quiz" class="reveal"></section>
        <section id="facts" class="reveal"></section>
        <section id="faq" class="reveal"></section>
        <section id="team" class="reveal"></section>
        <footer id="footer"></footer>
        <div id="modal-container"></div>
    `;

    initParticles(document.getElementById('particle-canvas')!);
    initNav(document.getElementById('nav')!);
    initHero(document.getElementById('hero')!);
    initPeriodicTable(document.getElementById('periodic-table-section')!);
    initCompare(document.getElementById('compare-section')!);
    initElementOfDay(document.getElementById('element-of-day')!);
    initTimeline(document.getElementById('timeline')!);
    initQuiz(document.getElementById('quiz')!);
    initFacts(document.getElementById('facts')!);
    initFAQ(document.getElementById('faq')!);
    initTeam(document.getElementById('team')!);
    initFooter(document.getElementById('footer')!);
    initModal(document.getElementById('modal-container')!);
    initScrollReveal();
}
