import { useRouter } from 'next/router'
import { useEffectOnce } from 'react-use'
import { webConfig } from '../../web-config'
// import { analytics } from '../firebase'

export const useGA = () => {
    const router = useRouter()

    useEffectOnce(() => {
        // initGA(code)
        logPageView()
        router.events.on('routeChangeComplete', logPageView)
    })
}

// export const initGA = (code: string) => {
//     console.log('GA init')
//     if (!env.isDev) {
//         ReactGA.initialize(code)
//     }
// }

export const logPageView = () => {
    if (webConfig.isDev) {
        return
    }

    // if (analytics) {
    //     console.log(`Logging pageview for ${window.location.pathname}`)
    //     analytics.logEvent('page_view', { page_path: window.location.pathname })

    //     // ReactGA.set({ page: window.location.pathname })
    //     // ReactGA.pageview(window.location.pathname)
    // }
}

// export const logEvent = (category = '', action = '') => {
//     if (category && action) {
//         ReactGA.event({ category, action })
//     }
// }

// export const logException = (description = '', fatal = false) => {
//     if (description) {
//         ReactGA.exception({ description, fatal })
//     }
// }
