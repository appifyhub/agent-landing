(function () {
  const doc = document.documentElement
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  doc.classList.remove('no-js')
  doc.classList.add('js')

  const measurementIds = {
    'agent.appifyhub.com': 'G-C3TQRKMCGZ',
    'staging.agent.appifyhub.com': 'G-SLDP72VCJX'
  }
  const measurementId = measurementIds[window.location.hostname]
  let analyticsInitialized = false

  function installAnalyticsNoop () {
    window.gtag = function gtag () {
      console.log('Allow cookies to enable Google Analytics')
    }
  }

  function initializeSectionTracking () {
    const sections = Array.from(document.querySelectorAll('[data-analytics-section]'))

    if (!sections.length || !('IntersectionObserver' in window)) return

    const visibleSections = new Set()
    const trackedSections = new Set()
    const sectionTimers = new Map()

    const cancelSectionTimer = (section) => {
      const timerId = sectionTimers.get(section)

      if (timerId === undefined) return

      window.clearTimeout(timerId)
      sectionTimers.delete(section)
    }

    const scheduleSectionView = (section) => {
      if (
        trackedSections.has(section) ||
        sectionTimers.has(section) ||
        document.visibilityState !== 'visible'
      ) {
        return
      }

      const timerId = window.setTimeout(() => {
        sectionTimers.delete(section)

        if (!visibleSections.has(section) || document.visibilityState !== 'visible') return

        trackedSections.add(section)
        window.gtag('event', 'section_view', {
          section_id: section.dataset.analyticsSection
        })
      }, 1000)

      sectionTimers.set(section, timerId)
    }

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.add(entry.target)
          scheduleSectionView(entry.target)
        } else {
          visibleSections.delete(entry.target)
          cancelSectionTimer(entry.target)
        }
      })
    }, {
      rootMargin: '-35% 0px -35% 0px'
    })

    sections.forEach((section) => sectionObserver.observe(section))

    document.addEventListener('visibilitychange', () => {
      sectionTimers.forEach((timerId) => window.clearTimeout(timerId))
      sectionTimers.clear()

      if (document.visibilityState === 'visible') {
        visibleSections.forEach((section) => scheduleSectionView(section))
      }
    })
  }

  function initializeInteractionTracking () {
    document.addEventListener('click', (event) => {
      if (!(event.target instanceof Element)) return

      const interactiveElement = event.target.closest('[data-analytics-id]')

      if (!interactiveElement) return

      const areaElement = interactiveElement.closest('[data-analytics-section], [data-analytics-area]')
      const eventParameters = {
        element_id: interactiveElement.dataset.analyticsId,
        element_type: interactiveElement.tagName.toLowerCase(),
        element_area: areaElement?.dataset.analyticsSection || areaElement?.dataset.analyticsArea || 'page'
      }

      if (interactiveElement instanceof HTMLAnchorElement) {
        eventParameters.link_url = interactiveElement.href
      }

      window.gtag('event', 'ui_click', eventParameters)
    })
  }

  function initializeAnalytics () {
    if (analyticsInitialized) return

    if (!measurementId) {
      console.log(`Google Analytics is disabled for ${window.location.hostname}.`)
      return
    }

    analyticsInitialized = true
    console.log(`Enabling Google Analytics for ${window.location.hostname}…`)

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag () {
      window.dataLayer.push(arguments)
    }
    window.agentAnalytics = {
      track: (eventName, properties) => window.gtag('event', eventName, properties || {})
    }

    window.gtag('js', new Date())
    window.gtag('config', measurementId)
    initializeSectionTracking()
    initializeInteractionTracking()

    const googleTag = document.createElement('script')
    googleTag.async = true
    googleTag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.append(googleTag)
  }

  function configureCookieConsent () {
    if (!window.CookieConsent) {
      installAnalyticsNoop()
      return
    }

    const updateAnalyticsConsent = () => {
      if (window.CookieConsent.acceptedCategory('analytics')) initializeAnalytics()
      else installAnalyticsNoop()
    }

    window.CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: 'bar',
          position: 'bottom',
          equalWeightButtons: false,
          flipButtons: true
        },
        preferencesModal: {
          layout: 'box',
          position: 'right',
          equalWeightButtons: false,
          flipButtons: true
        }
      },
      categories: {
        necessary: {
          readOnly: true
        },
        analytics: {}
      },
      language: {
        default: 'en',
        translations: {
          en: {
            consentModal: {
              title: 'Hello developer, it’s cookie time!',
              description: 'We use cookies to improve your experience. Analytics is optional, and Google Analytics only loads if you accept analytics cookies.',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              showPreferencesBtn: 'Settings',
              footer: '<a href="https://www.appifyhub.com/privacy.html#cookies">Privacy Policy</a><a href="https://www.appifyhub.com/terms.html">Terms of Service</a>'
            },
            preferencesModal: {
              title: 'Cookie Settings',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              savePreferencesBtn: 'Save',
              serviceCounterLabel: 'Service|Services',
              sections: [
                {
                  title: 'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
                  description: 'These cookies make the website work.',
                  linkedCategory: 'necessary'
                },
                {
                  title: 'Analytics Cookies',
                  description: 'Google Analytics helps us understand which sections and links are useful without collecting form input or typed text.',
                  linkedCategory: 'analytics'
                },
                {
                  title: 'More information',
                  description: 'Refer to the <a class="cc__link" href="https://www.appifyhub.com/privacy.html#cookies">Cookie Notice</a>.'
                }
              ]
            }
          }
        }
      },
      disablePageInteraction: true,
      onConsent: updateAnalyticsConsent,
      onChange: updateAnalyticsConsent
    })
  }

  configureCookieConsent()

  function track (eventName, properties) {
    const detail = { event: eventName, properties: properties || {} }

    if (window.agentAnalytics && typeof window.agentAnalytics.track === 'function') {
      window.agentAnalytics.track(eventName, detail.properties)
    }

    window.dispatchEvent(new CustomEvent('agent:analytics', { detail }))
  }

  const header = document.querySelector('[data-header]')
  const menuToggle = document.querySelector('.menu-toggle')
  const navigation = document.querySelector('.site-navigation')

  function closeMenu () {
    if (!menuToggle || !navigation) return

    menuToggle.setAttribute('aria-expanded', 'false')
    navigation.classList.remove('is-open')
    document.body.classList.remove('menu-open')
  }

  if (header) {
    const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 16)

    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
  }

  if (menuToggle && navigation) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true'

      menuToggle.setAttribute('aria-expanded', String(!isOpen))
      navigation.classList.toggle('is-open', !isOpen)
      document.body.classList.toggle('menu-open', !isOpen)
    })

    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu()
    })

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu()
    })
  }

  const sectionLinks = Array.from(document.querySelectorAll('.site-navigation a[href^="#"]'))
  const sectionTargets = sectionLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean)

  function focusHashTarget () {
    if (!window.location.hash || window.location.hash.startsWith('#features/')) return

    const target = document.querySelector(window.location.hash)

    if (!target) return
    target.tabIndex = -1
    target.focus({ preventScroll: true })
  }

  sectionLinks.forEach((link) => {
    link.addEventListener('click', () => window.setTimeout(focusHashTarget, 0))
  })
  window.addEventListener('hashchange', focusHashTarget)

  if ('IntersectionObserver' in window && sectionTargets.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

      if (!visibleSection) return

      sectionLinks.forEach((link) => {
        const isCurrent = link.getAttribute('href') === `#${visibleSection.target.id}`
        if (isCurrent) link.setAttribute('aria-current', 'location')
        else link.removeAttribute('aria-current')
      })
    }, { rootMargin: '-20% 0px -65%', threshold: [0, 0.25, 0.5] })

    sectionTargets.forEach((target) => sectionObserver.observe(target))
  }

  const typewriter = document.querySelector('[data-typewriter]')
  const typewriterPhrases = [
    'brings leading models together',
    'works where you chat',
    'costs only when you use it',
    'runs in lockdown mode',
    'doesn\'t ask for a subscription'
  ]

  if (typewriter && !reducedMotion.matches) {
    typewriter.textContent = ''

    let phraseIndex = 0
    let characterIndex = 0
    let direction = 1
    let timer
    let heroVisible = true
    let animationActive = !document.hidden

    const schedule = (delay) => {
      window.clearTimeout(timer)
      timer = window.setTimeout(tick, delay)
    }

    const tick = () => {
      if (!animationActive) return

      const phrase = typewriterPhrases[phraseIndex]
      characterIndex += direction
      typewriter.textContent = phrase.slice(0, characterIndex)

      if (direction === -1 && characterIndex === 0) {
        phraseIndex = (phraseIndex + 1) % typewriterPhrases.length
        direction = 1
        schedule(280)
        return
      }

      if (direction === 1 && characterIndex === typewriterPhrases[phraseIndex].length) {
        direction = -1
        schedule(2600)
        return
      }

      schedule(direction === 1 ? 40 : 25)
    }

    const updateAnimationState = () => {
      const nextState = !document.hidden && heroVisible

      if (nextState === animationActive) return

      animationActive = nextState

      if (animationActive) schedule(400)
      else window.clearTimeout(timer)
    }

    schedule(400)
    document.addEventListener('visibilitychange', updateAnimationState)

    const hero = typewriter.closest('.hero')

    if (hero && 'IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver(([entry]) => {
        heroVisible = entry.isIntersecting
        updateAnimationState()
      })

      heroObserver.observe(hero)
    }
  }

  const walkthrough = document.querySelector('[data-walkthrough]')

  if (walkthrough) {
    const tabs = Array.from(walkthrough.querySelectorAll('[role="tab"]'))
    const panels = Array.from(walkthrough.querySelectorAll('[role="tabpanel"]'))

    const selectWalkthroughStep = (selectedTab) => {
      tabs.forEach((tab) => {
        const selected = tab === selectedTab
        tab.setAttribute('aria-selected', selected)
        tab.tabIndex = selected ? 0 : -1
      })

      panels.forEach((panel) => {
        panel.hidden = panel.dataset.walkthroughPanel !== selectedTab.dataset.walkthroughStep
      })
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectWalkthroughStep(tab))
      tab.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return

        event.preventDefault()
        const direction = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1
        const nextTab = tabs[(index + direction + tabs.length) % tabs.length]

        selectWalkthroughStep(nextTab)
        nextTab.focus()
      })
    })
  }

  const explorer = document.querySelector('[data-explorer]')

  if (explorer) {
    const tabs = Array.from(explorer.querySelectorAll('[role="tab"]'))
    const panels = Array.from(explorer.querySelectorAll('[role="tabpanel"]'))
    const panelContainer = explorer.querySelector('.explorer-panels')
    let resizeAnimation
    const categoryFromHash = window.location.hash.match(/^#features\/(.+)$/)
    const initialCategory = categoryFromHash && tabs.some((tab) => tab.dataset.category === categoryFromHash[1])
      ? categoryFromHash[1]
      : tabs[0].dataset.category

    const selectCategory = (category, options) => {
      const settings = options || {}
      const selectedTab = tabs.find((tab) => tab.dataset.category === category)

      if (!selectedTab) return

      const previousHeight = panelContainer.getBoundingClientRect().height

      if (resizeAnimation) {
        resizeAnimation.cancel()
        panelContainer.style.removeProperty('overflow')
      }

      tabs.forEach((tab) => {
        const isSelected = tab === selectedTab
        tab.setAttribute('aria-selected', String(isSelected))
        tab.tabIndex = isSelected ? 0 : -1
      })

      panels.forEach((panel) => {
        panel.hidden = panel.dataset.panel !== category
      })

      const nextHeight = panelContainer.getBoundingClientRect().height

      if (settings.animate && !reducedMotion.matches && typeof panelContainer.animate === 'function' && Math.abs(nextHeight - previousHeight) > 1) {
        panelContainer.style.overflow = 'hidden'
        resizeAnimation = panelContainer.animate(
          [{ height: `${previousHeight}px` }, { height: `${nextHeight}px` }],
          { duration: 260, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
        )
        resizeAnimation.addEventListener('finish', () => {
          panelContainer.style.removeProperty('overflow')
          resizeAnimation = null
        }, { once: true })
      }

      if (settings.focus) selectedTab.focus()
      if (settings.updateHash) window.history.replaceState(null, '', `#features/${category}`)
      if (settings.track) track('feature_category_selected', { category })
    }

    selectCategory(initialCategory)

    if (categoryFromHash) {
      document.querySelector('#features').scrollIntoView()
      tabs.find((tab) => tab.dataset.category === initialCategory).focus({ preventScroll: true })
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        selectCategory(tab.dataset.category, { animate: true, updateHash: true, track: true })
      })

      tab.addEventListener('keydown', (event) => {
        let nextIndex

        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length
        if (event.key === 'Home') nextIndex = 0
        if (event.key === 'End') nextIndex = tabs.length - 1
        if (nextIndex === undefined) return

        event.preventDefault()
        selectCategory(tabs[nextIndex].dataset.category, { animate: true, focus: true, updateHash: true, track: true })
      })
    })
  }

  document.addEventListener('click', (event) => {
    const trackedElement = event.target.closest('[data-track]')

    if (trackedElement) {
      track(trackedElement.dataset.track, { source: trackedElement.dataset.source || 'page' })
    }
  })

  document.querySelectorAll('.faq-list details').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) track('faq_opened', { question: item.querySelector('summary').textContent.trim() })
    })
  })
}())
