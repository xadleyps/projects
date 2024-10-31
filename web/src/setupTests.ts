import '@testing-library/jest-dom';

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

class IntersectionObserver {
    constructor(callback: any) {
        this.callback = callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
}

window.IntersectionObserver = IntersectionObserver;
