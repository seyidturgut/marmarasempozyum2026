import React, { useEffect, useRef } from 'react';

const FooterGlobe = () => {
    const containerRef = useRef(null);
    const globeRef = useRef(null);
    const globeContainerRef = useRef(null);
    const globePoleRef = useRef(null);
    const globeHaloRef = useRef(null);

    useEffect(() => {
        if (!window.PerspectiveTransform || !window.TweenMax) return;

        const config = {
            percent: 0,
            lat: 10,
            lng: 0,
            segX: 14,
            segY: 12,
            isHaloVisible: true,
            isPoleVisible: true,
            autoSpin: true,
            zoom: 0.15,
        };

        const URLS = {
            diffuse: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/6043/css_globe_diffuse.jpg',
            halo: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/6043/css_globe_halo.png',
        };

        let globeDoms = [];
        let vertices = [];
        let rX = 0, rY = 0, rZ = 0;
        let sinRX, sinRY, sinRZ, cosRX, cosRY, cosRZ;
        let pixelExpandOffset = 1.5;
        let tick = 1;
        let requestRef;

        const transformStyleName = window.PerspectiveTransform.transformStyleName;

        const regenerateGlobe = () => {
            const globeContainer = globeContainerRef.current;
            if (!globeContainer) return;

            while (globeContainer.firstChild) {
                globeContainer.removeChild(globeContainer.firstChild);
            }

            const { segX, segY } = config;
            const diffuseImgBackgroundStyle = `url(${URLS.diffuse})`;
            const segWidth = (1600 / segX) | 0;
            const segHeight = (800 / segY) | 0;

            vertices = [];
            const radius = 536 / 2;
            const phiStart = 0;
            const phiLength = Math.PI * 2;
            const thetaStart = 0;
            const thetaLength = Math.PI;

            for (let y = 0; y <= segY; y++) {
                const verticesRow = [];
                for (let x = 0; x <= segX; x++) {
                    const u = x / segX;
                    const v = 0.05 + (y / segY) * (1 - 0.1);
                    const vertex = {
                        x: -radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength),
                        y: -radius * Math.cos(thetaStart + v * thetaLength),
                        z: radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength),
                        phi: phiStart + u * phiLength,
                        theta: thetaStart + v * thetaLength
                    };
                    verticesRow.push(vertex);
                }
                vertices.push(verticesRow);
            }

            globeDoms = [];
            for (let y = 0; y < segY; y++) {
                for (let x = 0; x < segX; x++) {
                    const dom = document.createElement('div');
                    const domStyle = dom.style;
                    domStyle.position = 'absolute';
                    domStyle.width = segWidth + 'px';
                    domStyle.height = segHeight + 'px';
                    domStyle.overflow = 'hidden';
                    domStyle[window.PerspectiveTransform.transformOriginStyleName] = '0 0';
                    domStyle.backgroundImage = diffuseImgBackgroundStyle;
                    dom.perspectiveTransform = new window.PerspectiveTransform(dom, segWidth, segHeight);
                    dom.topLeft = vertices[y][x];
                    dom.topRight = vertices[y][x + 1];
                    dom.bottomLeft = vertices[y + 1][x];
                    dom.bottomRight = vertices[y + 1][x + 1];
                    domStyle.backgroundPosition = `${-segWidth * x}px ${-segHeight * y}px`;
                    globeContainer.appendChild(dom);
                    globeDoms.push(dom);
                }
            }
        };

        const rotateVertex = (vertex, x, y, z) => {
            const x0 = x * cosRY - z * sinRY;
            const z0 = z * cosRY + x * sinRY;
            const y0_ = y * cosRX - z0 * sinRX;
            const z0_ = z0 * cosRX + y * sinRX;

            const offset = 1 + z0_ / 4000;
            const x1 = x0 * cosRZ - y0_ * sinRZ;
            const y0__ = y0_ * cosRZ + x0 * sinRZ;

            vertex.px = x1 * offset;
            vertex.py = y0__ * offset;
        };

        const expand = (v1, v2) => {
            let x = v2.px - v1.px, y = v2.py - v1.py;
            let det = x * x + y * y;
            if (det === 0) {
                v1.tx = v1.px; v1.ty = v1.py;
                v2.tx = v2.px; v2.ty = v2.py;
                return;
            }
            const idet = pixelExpandOffset / Math.sqrt(det);
            x *= idet; y *= idet;
            v2.tx = v2.px + x; v2.ty = v2.py + y;
            v1.tx = v1.px - x; v1.ty = v1.py - y;
        };

        const transformGlobe = () => {
            if (tick ^= 1) {
                sinRY = Math.sin(rY); sinRX = Math.sin(-rX); sinRZ = Math.sin(rZ);
                cosRY = Math.cos(rY); cosRX = Math.cos(-rX); cosRZ = Math.cos(rZ);

                const { segX, segY } = config;
                for (let y = 0; y <= segY; y++) {
                    const verticesRow = vertices[y];
                    for (let x = 0; x <= segX; x++) {
                        const vertex = verticesRow[x];
                        rotateVertex(vertex, vertex.x, vertex.y, vertex.z);
                    }
                }

                for (let y = 0; y < segY; y++) {
                    for (let x = 0; x < segX; x++) {
                        const dom = globeDoms[x + (segX * y)];
                        const v1 = dom.topLeft, v2 = dom.topRight, v3 = dom.bottomLeft, v4 = dom.bottomRight;
                        expand(v1, v2); expand(v2, v3); expand(v3, v4); expand(v4, v1);

                        const pt = dom.perspectiveTransform;
                        pt.topLeft.x = v1.tx; pt.topLeft.y = v1.ty;
                        pt.topRight.x = v2.tx; pt.topRight.y = v2.ty;
                        pt.bottomLeft.x = v3.tx; pt.bottomLeft.y = v3.ty;
                        pt.bottomRight.x = v4.tx; pt.bottomRight.y = v4.ty;

                        if (!pt.checkError()) {
                            pt.calc();
                        } else {
                            pt.hasError = true;
                        }
                    }
                }
            } else {
                for (let i = 0; i < globeDoms.length; i++) {
                    const pt = globeDoms[i].perspectiveTransform;
                    if (!pt.hasError) {
                        pt.update();
                    } else {
                        pt.style[transformStyleName] = 'translate3d(-8192px, 0, 0)';
                    }
                }
            }
        };

        const loop = () => {
            if (config.autoSpin) {
                config.lng = ((config.lng - 0.15 + 180) % 360) - 180;
            }

            rX = (config.lat / 180) * Math.PI;
            rY = (((config.lng + 180) % 360 - 180) - 270) / 180 * Math.PI;

            if (globePoleRef.current) globePoleRef.current.style.display = config.isPoleVisible ? 'block' : 'none';
            if (globeHaloRef.current) globeHaloRef.current.style.display = config.isHaloVisible ? 'block' : 'none';

            let ratio = Math.pow(config.zoom, 1.5);
            pixelExpandOffset = 1.5 + ratio * -1.25;
            ratio = 1 + ratio * 3;
            if (globeRef.current) globeRef.current.style[transformStyleName] = `scale3d(${ratio},${ratio},1)`;

            transformGlobe();
            requestRef = requestAnimationFrame(loop);
        };

        regenerateGlobe();
        requestRef = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(requestRef);
    }, []);

    return (
        <div className="footer-globe-wrapper" ref={containerRef}>
            <div className="world">
                <div className="world-globe" ref={globeRef}>
                    <div className="world-globe-pole" ref={globePoleRef}></div>
                    <div className="world-globe-doms-container" ref={globeContainerRef}></div>
                    <div className="world-globe-halo" ref={globeHaloRef} style={{ backgroundImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/6043/css_globe_halo.png)', backgroundSize: '100% 100%' }}></div>
                </div>
            </div>
        </div>
    );
};

export default FooterGlobe;
