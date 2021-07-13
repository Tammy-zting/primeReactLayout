import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { InputSwitch } from 'primereact/inputswitch';
import classNames from 'classnames';

export const AppConfig = (props) => {

    const [active, setActive] = useState(false);
    const config = useRef(null);
    let outsideClickListener = useRef(null);

    const unbindOutsideClickListener = useCallback(() => {
        if (outsideClickListener.current) {
            document.removeEventListener('click', outsideClickListener.current);
            outsideClickListener.current = null;
        }
    }, []);

    const hideConfigurator = useCallback((event) => {
        setActive(false);
        unbindOutsideClickListener();
        event.preventDefault();
    }, [unbindOutsideClickListener]);

    const bindOutsideClickListener = useCallback(() => {
        if (!outsideClickListener.current) {
            outsideClickListener.current = (event) => {
                if (active && isOutsideClicked(event)) {
                    hideConfigurator(event);
                }
            };
            document.addEventListener('click', outsideClickListener.current);
        }
    }, [active, hideConfigurator]);

    useEffect(() => {
        if (active) {
            bindOutsideClickListener()
        }
        else {
            unbindOutsideClickListener()
        }
    }, [active, bindOutsideClickListener, unbindOutsideClickListener]);

    const isOutsideClicked = (event) => {
        return !(config.current.isSameNode(event.target) || config.current.contains(event.target));
    }

    const toggleConfigurator = (event) => {
        setActive(prevState => !prevState);
    }

    const onThemeChange=(event,theme,dark)=>{
        if(props.onThemeChange){
            props.onThemeChange({
                originalEvent:event,
                theme,
                dark
            })
        }
        event.preventDefault()
    }
    

    const configClassName = classNames('layout-config', {
        'layout-config-active': active
    });

    return (
        <div ref={config} className={configClassName}>
            <div className="layout-config-content-wrapper">
                <button className="layout-config-button p-link" onClick={toggleConfigurator}>
                    <i className="pi pi-cog"></i>
                </button>
                <button className="layout-config-close p-link" onClick={hideConfigurator}>
                    <i className="pi pi-times"></i>
                </button>
            </div>
            <div className="layout-config-content">

                <h5 style={{ marginTop: '0px' }}>Input Style</h5>
                <div className="p-formgroup-inline">
                    <div className="p-field-radiobutton">
                        <RadioButton inputId="input_outlined" name="inputstyle" value="outlined" onChange={(e) => props.onInputStyleChange(e.value)} checked={props.inputStyle === 'outlined'} />
                        <label htmlFor="input_outlined">Outlined</label>
                    </div>
                    <div className="p-field-radiobutton">
                        <RadioButton inputId="input_filled" name="inputstyle" value="filled" onChange={(e) => props.onInputStyleChange(e.value)} checked={props.inputStyle === 'filled'} />
                        <label htmlFor="input_filled">Filled</label>
                    </div>
                </div>

                <h5>Ripple Effect</h5>
                <InputSwitch checked={props.rippleEffect} onChange={props.onRippleEffect} />

                <h5>Menu Type</h5>
                <div className="p-formgroup-inline">
                    <div className="p-field-radiobutton">
                        <RadioButton inputId="static" name="layoutMode" value="static" onChange={(e) => props.onLayoutModeChange(e.value)} checked={props.layoutMode === 'static'} />
                        <label htmlFor="static">Static</label>
                    </div>
                    <div className="p-field-radiobutton">
                        <RadioButton inputId="overlay" name="layoutMode" value="overlay" onChange={(e) => props.onLayoutModeChange(e.value)} checked={props.layoutMode === 'overlay'} />
                        <label htmlFor="overlay">Overlay</label>
                    </div>
                </div>

                <h5>Menu Color</h5>
                <div className="p-formgroup-inline">
                    <div className="p-field-radiobutton">
                        <RadioButton inputId="dark" name="layoutColorMode" value="dark" onChange={(e) => props.onColorModeChange(e.value)} checked={props.layoutColorMode === 'dark'} />
                        <label htmlFor="dark">Dark</label>
                    </div>
                    <div className="p-field-radiobutton">
                        <RadioButton inputId="light" name="layoutColorMode" value="light" onChange={(e) => props.onColorModeChange(e.value)} checked={props.layoutColorMode === 'light'} />
                        <label htmlFor="light">Light</label>
                    </div>
                </div>
                <h5>Bootstrap</h5>
                <div className="p-grid free-themes">
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/bootstrap4-light-blue.svg" alt="Bootstrap Light Blue" onClick={(e) => onThemeChange(e, 'bootstrap4-light-blue')} />
                        </button>
                        <span>Blue</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/bootstrap4-light-purple.svg" alt="Bootstrap Light Blue" onClick={(e) => onThemeChange(e, 'bootstrap4-light-purple')} />
                        </button>
                        <span>Purple</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/bootstrap4-dark-blue.svg" alt="Bootstrap Dark Blue" onClick={(e) => onThemeChange(e, 'bootstrap4-dark-blue', true)} />
                        </button>
                        <span>Blue</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/bootstrap4-dark-purple.svg" alt="Bootstrap Dark Blue" onClick={(e) => onThemeChange(e, 'bootstrap4-dark-purple', true)} />
                        </button>
                        <span>Purple</span>
                    </div>
                </div>

                <h5>Material Design</h5>
                <div className="p-grid free-themes">
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/md-light-indigo.svg" alt="Material Light Indigo" onClick={(e) => onThemeChange(e, 'md-light-indigo')} />
                        </button>
                        <span>Indigo</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/md-light-deeppurple.svg" alt="Material Light Deep Purple" onClick={(e) => onThemeChange(e, 'md-light-deeppurple')} />
                        </button>
                        <span>Deep Purple</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/md-dark-indigo.svg" alt="Material Dark Indigo" onClick={(e) => onThemeChange(e, 'md-dark-indigo', true)} />
                        </button>
                        <span>Indigo</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/md-dark-deeppurple.svg" alt="Material Dark Deep Purple" onClick={(e) => onThemeChange(e, 'md-dark-deeppurple', true)} />
                        </button>
                        <span>Deep Purple</span>
                    </div>
                </div>

                <h5>Material Design Compact</h5>
                <div className="p-grid free-themes">
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/md-light-indigo.svg" alt="Material Compact Light Indigo" onClick={(e) => onThemeChange(e, 'mdc-light-indigo')} />
                        </button>
                        <span>Indigo</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/md-light-deeppurple.svg" alt="Material Compact Deep Purple" onClick={(e) => onThemeChange(e, 'mdc-light-deeppurple')} />
                        </button>
                        <span>Deep Purple</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/md-dark-indigo.svg" alt="Material Compact Dark Indigo" onClick={(e) => onThemeChange(e, 'mdc-dark-indigo', true)} />
                        </button>
                        <span>Indigo</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/md-dark-deeppurple.svg" alt="Material Compact Dark Deep Purple" onClick={(e) => onThemeChange(e, 'mdc-dark-deeppurple', true)} />
                        </button>
                        <span>Deep Purple</span>
                    </div>
                </div>

                <h5>Fluent UI</h5>
                <div className="p-grid free-themes">
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/fluent-light.png" alt="Fluent Light" onClick={(e) => onThemeChange(e, 'fluent-light')} />
                        </button>
                        <span>Blue</span>
                    </div>
                </div>

                <h5>PrimeOne Design</h5>
                <div className="p-grid free-themes">
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/saga-blue.png" alt="Saga Blue" onClick={(e) => onThemeChange(e, 'saga-blue')} />
                        </button>
                        <span>Saga Blue</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/saga-green.png" alt="Saga Green" onClick={(e) => onThemeChange(e, 'saga-green')} />
                        </button>
                        <span>Saga Green</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/saga-orange.png" alt="Saga Orange" onClick={(e) => onThemeChange(e, 'saga-orange')} />
                        </button>
                        <span>Saga Orange</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/saga-purple.png" alt="Saga Purple" onClick={(e) => onThemeChange(e, 'saga-purple')} />
                        </button>
                        <span>Saga Purple</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/vela-blue.png" alt="Vela Blue" onClick={(e) => onThemeChange(e, 'vela-blue', true)} />
                        </button>
                        <span>Vela Blue</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/vela-green.png" alt="Vela Green" onClick={(e) => onThemeChange(e, 'vela-green', true)} />
                        </button>
                        <span>Vela Green</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/vela-orange.png" alt="Vela Orange" onClick={(e) => onThemeChange(e, 'vela-orange', true)} />
                        </button>
                        <span>Vela Orange</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/vela-purple.png" alt="Vela Purple" onClick={(e) => onThemeChange(e, 'vela-purple', true)} />
                        </button>
                        <span>Vela Purple</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/arya-blue.png" alt="Arya Blue" onClick={(e) => onThemeChange(e, 'arya-blue', true)} />
                        </button>
                        <span>Arya Blue</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/arya-green.png" alt="Arya Green" onClick={(e) => onThemeChange(e, 'arya-green', true)} />
                        </button>
                        <span>Arya Green</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/arya-orange.png" alt="Arya Orange" onClick={(e) => onThemeChange(e, 'arya-orange', true)} />
                        </button>
                        <span>Arya Orange</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/arya-purple.png" alt="Arya Purple" onClick={(e) => onThemeChange(e, 'arya-purple', true)} />
                        </button>
                        <span>Arya Purple</span>
                    </div>
                </div>

                <h5>Premium Themes</h5>
                <p>Premium themes are only available exclusively for <a href="https://www.primefaces.org/designer/primereact">PrimeReact Theme Designer</a> subscribers and therefore not included in PrimeReact core.</p>
                <div className="p-grid free-themes">
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/soho-light.png" alt="Soho Light" onClick={(e) => onThemeChange(e, 'soho-light')} />
                        </button>
                        <span>Soho Light</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/soho-dark.png" alt="Soho Dark" onClick={(e) => onThemeChange(e, 'soho-dark', true)} />
                        </button>
                        <span>Soho Dark</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/viva-light.svg" alt="Viva Light" onClick={(e) => onThemeChange(e, 'viva-light')} />
                        </button>
                        <span>Viva Light</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/viva-dark.svg" alt="Viva Dark" onClick={(e) => onThemeChange(e, 'viva-dark', true)} />
                        </button>
                        <span>Viva Dark</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/mira.jpg" alt="Mira" onClick={(e) => onThemeChange(e, 'mira')} />
                        </button>
                        <span>Mira</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/nano.jpg" alt="Nano" onClick={(e) => onThemeChange(e, 'nano')} />
                        </button>
                        <span>Nano</span>
                    </div>
                </div>

                <h4>Legacy Free Themes</h4>
                <div className="p-grid free-themes">
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/nova.png" alt="Nova" onClick={(e) => onThemeChange(e, 'nova')} />
                        </button>
                        <span>Nova</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/nova-alt.png" alt="Nova Alt" onClick={(e) => onThemeChange(e, 'nova-alt')} />
                        </button>
                        <span>Nova Alt</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/nova-accent.png" alt="Nova Accent" onClick={(e) => onThemeChange(e, 'nova-accent')} />
                        </button>
                        <span>Nova Accent</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/luna-blue.png" alt="Luna Blue" onClick={(e) => onThemeChange(e, 'luna-blue', true)} />
                        </button>
                        <span>Luna Blue</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/luna-green.png" alt="Luna Green" onClick={(e) => onThemeChange(e, 'luna-green', true)} />
                        </button>
                        <span>Luna Green</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/luna-amber.png" alt="Luna Amber" onClick={(e) => onThemeChange(e, 'luna-amber', true)} />
                        </button>
                        <span>Luna Amber</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/luna-pink.png" alt="Luna Pink" onClick={(e) => onThemeChange(e, 'luna-pink', true)} />
                        </button>
                        <span>Luna Pink</span>
                    </div>
                    <div className="p-col-3">
                        <button className="p-link">
                            <img src="showcase/images/themes/rhea.png" alt="Rhea" onClick={(e) => onThemeChange(e, 'rhea', false)} />
                        </button>
                        <span>Rhea</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
