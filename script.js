const detailSections = {
    inicio: {
        title: 'Sobre o NEABI',
        description: 'Conheça a missão do núcleo em promover a Educação para as Relações Étnico-Raciais.',
        templateId: 'tpl-inicio'
    },
    missao: {
        title: 'Missão e Objetivos',
        description: 'Objetivos estratégicos que sustentam as ações afirmativas no campus.',
        templateId: 'tpl-missao'
    },
    historia: {
        title: 'História',
        description: 'A linha histórica que fortalece a presença do NEABI no Seridó Potiguar.',
        templateId: 'tpl-historia'
    },
    linha: {
        title: 'Linha do Tempo',
        description: 'Marcos que celebram momentos-chave de resistência e articulação.',
        templateId: 'tpl-linha'
    },
    atuacao: {
        title: 'Atuação',
        description: 'Frentes de ensino, pesquisa, extensão e políticas afirmativas.',
        templateId: 'tpl-atuacao'
    },
    eventos: {
        title: 'Eventos',
        description: 'Programações que conectam comunidade, campus e ancestralidade.',
        templateId: 'tpl-eventos'
    },
    composicao: {
        title: 'Composição',
        description: 'Quem integra o NEABI/CN em 2024.',
        templateId: 'tpl-composicao'
    },
    base: {
        title: 'Base Legal',
        description: 'Referências legais que orientam a educação antirracista.',
        templateId: 'tpl-base'
    },
    contato: {
        title: 'Contato',
        description: 'Canais oficiais para falar com o núcleo.',
        templateId: 'tpl-contato'
    },
    ndr: {
        title: 'Negros do Riacho',
        description: 'Conheça a comunidade quilombola parceira do NEABI.',
        templateId: 'tpl-ndr'
    },
    reconhecimento: {
        title: 'História e Reconhecimento',
        description: 'Processos de certificação e luta territorial do quilombo.',
        templateId: 'tpl-reconhecimento'
    },
    cultura: {
        title: 'Cultura e Organização Social',
        description: 'Artesanato, memória coletiva e redes de apoio.',
        templateId: 'tpl-cultura'
    }
};

let revealObserver;

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupScrollReveal(document);
    hydrateDetailPage();
});

function setupNavigation() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const navList = document.querySelector('[data-nav-list]');
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = document.body.dataset.page;
    const currentSection = new URLSearchParams(window.location.search).get('section');
    const navWrapper = navList ? navList.parentElement : null;

    const closeMobileNav = () => {
        if (toggle && navWrapper) {
            toggle.setAttribute('aria-expanded', 'false');
            navWrapper.classList.remove('open');
        }
    };

    if (toggle && navList) {
        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!expanded));
            navWrapper.classList.toggle('open', !expanded);
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1200) {
                closeMobileNav();
            }
        });
    }

    navLinks.forEach(link => {
        const pageTarget = link.dataset.pageTarget;
        const sectionTarget = link.dataset.sectionTarget;

        if ((pageTarget && pageTarget === currentPage) ||
            (sectionTarget && sectionTarget === currentSection)) {
            link.classList.add('active');
        }

        link.addEventListener('click', () => {
            closeMobileNav();
        });
    });
}

function setupScrollReveal(scope = document) {
    const elements = scope.querySelectorAll('[data-animate]:not(.animate-ready)');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
        elements.forEach(el => el.classList.add('is-visible'));
        return;
    }

    if (!revealObserver) {
        revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    }

    elements.forEach(el => {
        el.classList.add('animate-ready');
        revealObserver.observe(el);
    });
}

function hydrateDetailPage() {
    const container = document.querySelector('[data-dynamic-content]');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const key = params.get('section') || 'inicio';
    const config = detailSections[key] || detailSections.inicio;
    const template = document.getElementById(config.templateId);

    container.innerHTML = '';

    if (template) {
        container.appendChild(template.content.cloneNode(true));
        setupScrollReveal(container);
    } else {
        container.innerHTML = '<p data-animate>Conteúdo em preparação. Volte em breve!</p>';
    }

    const titleEl = document.getElementById('detail-title');
    const descriptionEl = document.getElementById('detail-description');

    if (titleEl) titleEl.textContent = config.title;
    if (descriptionEl) descriptionEl.textContent = config.description;
    document.title = `${config.title} | NEABI - IFRN Campus Currais Novos`;
}