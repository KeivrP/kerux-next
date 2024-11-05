import React from "react";

export interface MenuItemUser {
    menu: string;
    label: string;
    icon: string | JSX.Element;
    path: string;
}

export type CodMenu = 'MENUCNT' | 'MENUCOM' | 'MENUDOC' | 'MENUING' | 'MENULOG';

export const getLabel = (codmenu: CodMenu): string => {
    console.log('getLabel codmenu:', codmenu); // Log para depuración
    switch (codmenu) {
        case 'MENUCNT':
            return 'Contratos';
        case 'MENUCOM':
            return 'Adquisiciones';
        case 'MENUDOC':
            return 'Documentos';
        case 'MENUING':
            return 'Financeiro';
        case 'MENULOG':
            return 'Control de suministro';
        default:
            return 'Desconocido';
    }
};

export const getPath = (codmenu: CodMenu): string => {
    console.log('getPath codmenu:', codmenu); // Log para depuración
    switch (codmenu) {
        case 'MENUCNT':
            return '/menucnt';
        case 'MENUCOM':
            return '/menucom';
        case 'MENUDOC':
            return '/menudoc';
        case 'MENUING':
            return '/menuing';
        case 'MENULOG':
            return '/menulog';
        default:
            return '#';
    }
};

export const getMenuIcon = (codmenu: CodMenu): JSX.Element => {
    switch (codmenu) {
        case 'MENUCNT':
            return (
                <>

                    <svg xmlns="http://www.w3.org/2000/svg"
                        width={30}
                        height={30}
                        viewBox="0 0 30 30"
                        fill="none"
                    >
                        <g clipPath="url(#prefix__clip0_603_18714)">
                            <rect width={30} height={30} rx={3} fill="#C62828" />
                            <rect
                                width={30}
                                height={30}
                                rx={3}
                                fill="url(#prefix__paint0_linear_603_18714)"
                                fillOpacity={0.54}
                                style={{
                                    mixBlendMode: "luminosity",
                                }}
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M28 9.982h-7.44l-5.022 5.023 5.024 5.024H28v7.983h-7.983V20.56L15 15.542 9.983 20.56v7.45H2v-7.982h7.44l5.023-5.023L9.44 9.983H2V2h7.983v7.45L15 14.467l5.017-5.017V2H28v7.982z"
                                fill="#811"
                            />
                            <path fill="#811" d="M15 16.111h15v11.944H15z" />
                            <g filter="url(#prefix__filter0_dddd_603_18714)">
                                <path
                                    d="M25.916 21.455h-2.003a1.36 1.36 0 00-.114-.451 1.019 1.019 0 00-.248-.348c-.104-.1-.231-.175-.38-.227a1.475 1.475 0 00-.508-.082c-.332 0-.612.08-.842.241a1.49 1.49 0 00-.518.693c-.116.3-.174.662-.174 1.083 0 .445.059.818.177 1.119.121.298.295.523.522.674.228.15.501.224.82.224.183 0 .346-.023.49-.067.145-.048.27-.115.377-.203.107-.088.193-.193.26-.316.068-.126.114-.266.138-.423l2.003.015c-.024.307-.11.621-.26.94-.149.318-.36.611-.635.881-.272.268-.61.483-1.012.647-.403.163-.87.245-1.403.245-.668 0-1.267-.144-1.797-.43a3.115 3.115 0 01-1.253-1.264c-.306-.557-.458-1.237-.458-2.042 0-.81.156-1.492.468-2.046a3.13 3.13 0 011.265-1.26 3.675 3.675 0 011.775-.43c.46 0 .882.063 1.268.188a3.05 3.05 0 011.016.55c.29.24.525.535.703.885.177.35.285.752.323 1.204z"
                                    fill="#FFC3C3"
                                />
                            </g>
                            <path fill="#811" d="M12.5 13.611h4v4h-4z" />
                            <g clipPath="url(#prefix__clip1_603_18714)">
                                <path fill="#811" d="M15 2H0v14h15z" />
                                <g filter="url(#prefix__filter1_dddd_603_18714)">
                                    <path
                                        d="M4 5.625A1.625 1.625 0 015.625 4h4.75A1.625 1.625 0 0112 5.625v6.75A1.625 1.625 0 0110.375 14h-4.75A1.624 1.624 0 014 12.375v-6.75zM6.5 5.5a1 1 0 00-1 1V7a1 1 0 001 1h3a1 1 0 001-1v-.5a1 1 0 00-1-1h-3zm.25 4.125a.625.625 0 10-1.25 0 .625.625 0 001.25 0zm-.625 2.625a.625.625 0 100-1.25.625.625 0 000 1.25zM10.5 9.625a.625.625 0 10-1.25 0 .625.625 0 001.25 0zm-.625 2.625a.625.625 0 100-1.25.625.625 0 000 1.25zm-1.25-2.625a.625.625 0 10-1.25 0 .625.625 0 001.25 0zM8 12.25A.625.625 0 108 11a.625.625 0 000 1.25z"
                                        fill="#FEFEFE"
                                    />
                                </g>
                            </g>
                        </g>
                        <defs>
                            <clipPath id="prefix__clip0_603_18714">
                                <rect width={30} height={30} rx={3} fill="#fff" />
                            </clipPath>
                            <clipPath id="prefix__clip1_603_18714">
                                <path
                                    fill="#fff"
                                    transform="matrix(-1 0 0 1 15 2)"
                                    d="M0 0h15v14H0z"
                                />
                            </clipPath>
                            <filter
                                id="prefix__filter0_dddd_603_18714"
                                x={12.098}
                                y={14.628}
                                width={20.818}
                                height={22.472}
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy={4} />
                                <feGaussianBlur stdDeviation={3.5} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                <feBlend
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_603_18714"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy={1} />
                                <feGaussianBlur stdDeviation={2.5} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                                <feBlend
                                    in2="effect1_dropShadow_603_18714"
                                    result="effect2_dropShadow_603_18714"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy={2} />
                                <feGaussianBlur stdDeviation={1} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
                                <feBlend
                                    in2="effect2_dropShadow_603_18714"
                                    result="effect3_dropShadow_603_18714"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feMorphology
                                    radius={2}
                                    in="SourceAlpha"
                                    result="effect4_dropShadow_603_18714"
                                />
                                <feOffset dy={3} />
                                <feGaussianBlur stdDeviation={0.5} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                                <feBlend
                                    in2="effect3_dropShadow_603_18714"
                                    result="effect4_dropShadow_603_18714"
                                />
                                <feBlend
                                    in="SourceGraphic"
                                    in2="effect4_dropShadow_603_18714"
                                    result="shape"
                                />
                            </filter>
                            <filter
                                id="prefix__filter1_dddd_603_18714"
                                x={-3}
                                y={0}
                                width={22}
                                height={25}
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy={4} />
                                <feGaussianBlur stdDeviation={3.5} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                <feBlend
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_603_18714"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy={1} />
                                <feGaussianBlur stdDeviation={2.5} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                                <feBlend
                                    in2="effect1_dropShadow_603_18714"
                                    result="effect2_dropShadow_603_18714"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy={2} />
                                <feGaussianBlur stdDeviation={1} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
                                <feBlend
                                    in2="effect2_dropShadow_603_18714"
                                    result="effect3_dropShadow_603_18714"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feMorphology
                                    radius={2}
                                    in="SourceAlpha"
                                    result="effect4_dropShadow_603_18714"
                                />
                                <feOffset dy={3} />
                                <feGaussianBlur stdDeviation={0.5} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                                <feBlend
                                    in2="effect3_dropShadow_603_18714"
                                    result="effect4_dropShadow_603_18714"
                                />
                                <feBlend
                                    in="SourceGraphic"
                                    in2="effect4_dropShadow_603_18714"
                                    result="shape"
                                />
                            </filter>
                            <linearGradient
                                id="prefix__paint0_linear_603_18714"
                                x1={-34.5}
                                y1={26.5}
                                x2={33}
                                y2={26.5}
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop />
                                <stop offset={1} stopColor="#fff" />
                            </linearGradient>
                        </defs>
                    </svg>
                </>
            );
        case 'MENUCOM':
            return (
                <svg width={30}
                    height={30}
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clipPath="url(#prefix__clip0_603_18712)">
                        <rect width={30} height={30} rx={3} fill="#651FFF" />
                        <rect
                            width={30}
                            height={30}
                            rx={3}
                            fill="url(#prefix__paint0_linear_603_18712)"
                            fillOpacity={0.54}
                            style={{
                                mixBlendMode: "luminosity",
                            }}
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M28 9.982h-7.44l-5.022 5.023 5.024 5.024H28v7.983h-7.983V20.56L15 15.542 9.983 20.56v7.45H2v-7.982h7.44l5.023-5.023L9.44 9.983H2V2h7.983v7.45L15 14.467l5.017-5.017V2H28v7.982z"
                            fill="#3A1195"
                        />
                        <path fill="#3A1195" d="M15 16.111h15v11.944H15z" />
                        <g filter="url(#prefix__filter0_dddd_603_18712)">
                            <path
                                d="M20.878 26h-2.13l2.4-7.273h2.7l2.4 7.273h-2.13l-1.592-5.27h-.057L20.88 26zm-.397-2.87h4.005v1.478h-4.005v-1.477z"
                                fill="#BA9AFF"
                            />
                        </g>
                        <path fill="#3A1195" d="M12.5 13.611h4v4h-4z" />
                        <g clipPath="url(#prefix__clip1_603_18712)">
                            <path fill="#3A1195" d="M15 2H0v14h15z" />
                            <g filter="url(#prefix__filter1_dddd_603_18712)">
                                <path
                                    d="M12.703 8.706L8.29 4.29A.999.999 0 007.584 4H4c-.55 0-1 .45-1 1v3.586c0 .265.105.52.295.705l4.414 4.416c.39.39 1.025.39 1.415 0l3.584-3.585a.998.998 0 00-.005-1.416zM5.25 7.001a.749.749 0 110-1.5.749.749 0 110 1.5z"
                                    fill="#FEFEFE"
                                />
                            </g>
                        </g>
                    </g>
                    <defs>
                        <clipPath id="prefix__clip0_603_18712">
                            <rect width={30} height={30} rx={3} fill="#fff" />
                        </clipPath>
                        <clipPath id="prefix__clip1_603_18712">
                            <path fill="#fff" transform="matrix(-1 0 0 1 15 2)" d="M0 0h15v14H0z" />
                        </clipPath>
                        <filter
                            id="prefix__filter0_dddd_603_18712"
                            x={11.748}
                            y={14.727}
                            width={21.5}
                            height={22.273}
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood floodOpacity={0} result="BackgroundImageFix" />
                            <feColorMatrix
                                in="SourceAlpha"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dy={4} />
                            <feGaussianBlur stdDeviation={3.5} />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                            <feBlend
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_603_18712"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dy={1} />
                            <feGaussianBlur stdDeviation={2.5} />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                            <feBlend
                                in2="effect1_dropShadow_603_18712"
                                result="effect2_dropShadow_603_18712"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dy={2} />
                            <feGaussianBlur stdDeviation={1} />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
                            <feBlend
                                in2="effect2_dropShadow_603_18712"
                                result="effect3_dropShadow_603_18712"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feMorphology
                                radius={2}
                                in="SourceAlpha"
                                result="effect4_dropShadow_603_18712"
                            />
                            <feOffset dy={3} />
                            <feGaussianBlur stdDeviation={0.5} />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                            <feBlend
                                in2="effect3_dropShadow_603_18712"
                                result="effect4_dropShadow_603_18712"
                            />
                            <feBlend
                                in="SourceGraphic"
                                in2="effect4_dropShadow_603_18712"
                                result="shape"
                            />
                        </filter>
                        <filter
                            id="prefix__filter1_dddd_603_18712"
                            x={-4}
                            y={0}
                            width={24}
                            height={25}
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood floodOpacity={0} result="BackgroundImageFix" />
                            <feColorMatrix
                                in="SourceAlpha"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dy={4} />
                            <feGaussianBlur stdDeviation={3.5} />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                            <feBlend
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_603_18712"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dy={1} />
                            <feGaussianBlur stdDeviation={2.5} />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                            <feBlend
                                in2="effect1_dropShadow_603_18712"
                                result="effect2_dropShadow_603_18712"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dy={2} />
                            <feGaussianBlur stdDeviation={1} />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
                            <feBlend
                                in2="effect2_dropShadow_603_18712"
                                result="effect3_dropShadow_603_18712"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feMorphology
                                radius={2}
                                in="SourceAlpha"
                                result="effect4_dropShadow_603_18712"
                            />
                            <feOffset dy={3} />
                            <feGaussianBlur stdDeviation={0.5} />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                            <feBlend
                                in2="effect3_dropShadow_603_18712"
                                result="effect4_dropShadow_603_18712"
                            />
                            <feBlend
                                in="SourceGraphic"
                                in2="effect4_dropShadow_603_18712"
                                result="shape"
                            />
                        </filter>
                        <linearGradient
                            id="prefix__paint0_linear_603_18712"
                            x1={-34.5}
                            y1={26.5}
                            x2={33}
                            y2={26.5}
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop />
                            <stop offset={1} stopColor="#fff" />
                        </linearGradient>
                    </defs>
                </svg>
            );
        case 'MENUDOC':
            return (
                <svg xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    viewBox="0 0 30 30"
                    fill="none"
                >
                    <g clipPath="url(#prefix__clip0_603_18715)">
                        <rect width={40} height={40} rx={3} fill="#3F9A43" />
                        <rect
                            width={40}
                            height={40}
                            rx={3}
                            fill="url(#prefix__paint0_linear_603_18715)"
                            fillOpacity={0.54}
                            style={{
                                mixBlendMode: "luminosity",
                            }}
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M28 9.982h-7.44l-5.022 5.023 5.024 5.024H28v7.983h-7.983V20.56L15 15.542 9.983 20.56v7.45H2v-7.982h7.44l5.023-5.023L9.44 9.983H2V2h7.983v7.45L15 14.467l5.017-5.017V2H28v7.982z"
                            fill="#205922"
                        />
                        <path fill="#205922" d="M15 16.111h15v11.944H15z" />
                        <g filter="url(#prefix__filter0_dddd_603_18715)">
                            <path
                                d="M22.1 26h-2.798v-7.272h2.77c.748 0 1.394.145 1.939.436a3.01 3.01 0 011.264 1.25c.298.543.447 1.192.447 1.95s-.148 1.409-.444 1.953a3.045 3.045 0 01-1.257 1.25c-.542.289-1.182.433-1.92.433zm-.824-1.676h.753c.36 0 .666-.058.92-.174.255-.116.45-.316.582-.6.135-.284.203-.68.203-1.186 0-.507-.07-.902-.206-1.186a1.18 1.18 0 00-.597-.6c-.26-.116-.58-.174-.959-.174h-.696v3.92z"
                                fill="#84EA8A"
                            />
                        </g>
                        <path fill="#205922" d="M12.5 13.611h4v4h-4z" />
                        <g clipPath="url(#prefix__clip1_603_18715)">
                            <path fill="#205922" d="M15 2H0v14h15z" />
                            <g filter="url(#prefix__filter1_dddd_603_18715)" fill="#FEFEFE">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8.875 14.018H6.917c-1.847 0-2.77 0-3.343-.587C3 12.845 3 11.901 3 10.011V8.007c0-1.888 0-2.833.574-3.42C4.147 4 5.075 4 6.93 4c.297 0 .534 0 .735.009a.777.777 0 00-.01.122L7.65 5.55c0 .549 0 1.035.051 1.426.056.424.184.849.523 1.195.338.346.753.477 1.167.534.383.053.858.053 1.395.053h1.984c.02.267.02.596.02 1.033v.22c0 1.888 0 2.833-.573 3.42-.573.586-1.497.586-3.343.586z"
                                />
                                <path d="M11.496 6.814L9.556 5.03c-.55-.508-.827-.762-1.166-.895l-.004 1.37c0 1.18 0 1.77.358 2.137s.936.367 2.09.367h1.752c-.177-.353-.495-.645-1.09-1.194z" />
                            </g>
                        </g>
                    </g>
                    <defs>
                        <clipPath id="prefix__clip0_603_18715">
                            <rect width={30} height={30} rx={3} fill="#fff" />
                        </clipPath>
                        <clipPath id="prefix__clip1_603_18715">
                            <path
                                fill="#fff"
                                transform="matrix(-1 0 0 1 15 2)"
                                d="M0 0h15v14H0z"
                            />
                        </clipPath>
                        <filter
                            id="prefix__filter0_dddd_603_18715"
                            x={12.302}
                            y={14.728}
                            width={20.421}
                            height={22.273}
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood floodOpacity={0} result="BackgroundImageFix" />
                            <feColorMatrix
                                in="SourceAlpha"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dy={4} />
                            <feGaussianBlur stdDeviation={3.5} />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                            <feBlend
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_603_18715"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dy={1} />
                            <feGaussianBlur stdDeviation={2.5} />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                            <feBlend
                                in2="effect1_dropShadow_603_18715"
                                result="effect2_dropShadow_603_18715"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dy={2} />
                            <feGaussianBlur stdDeviation={1} />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
                            <feBlend
                                in2="effect2_dropShadow_603_18715"
                                result="effect3_dropShadow_603_18715"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feMorphology
                                radius={2}
                                in="SourceAlpha"
                                result="effect4_dropShadow_603_18715"
                            />
                            <feOffset dy={3} />
                            <feGaussianBlur stdDeviation={0.5} />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                            <feBlend
                                in2="effect3_dropShadow_603_18715"
                                result="effect4_dropShadow_603_18715"
                            />
                            <feBlend
                                in="SourceGraphic"
                                in2="effect4_dropShadow_603_18715"
                                result="shape"
                            />
                        </filter>
                        <filter
                            id="prefix__filter1_dddd_603_18715"
                            x={-4}
                            y={0}
                            width={23.792}
                            height={25.018}
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feFlood floodOpacity={0} result="BackgroundImageFix" />
                            <feColorMatrix
                                in="SourceAlpha"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dy={4} />
                            <feGaussianBlur stdDeviation={3.5} />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                            <feBlend
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_603_18715"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dy={1} />
                            <feGaussianBlur stdDeviation={2.5} />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                            <feBlend
                                in2="effect1_dropShadow_603_18715"
                                result="effect2_dropShadow_603_18715"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dy={2} />
                            <feGaussianBlur stdDeviation={1} />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
                            <feBlend
                                in2="effect2_dropShadow_603_18715"
                                result="effect3_dropShadow_603_18715"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feMorphology
                                radius={2}
                                in="SourceAlpha"
                                result="effect4_dropShadow_603_18715"
                            />
                            <feOffset dy={3} />
                            <feGaussianBlur stdDeviation={0.5} />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                            <feBlend
                                in2="effect3_dropShadow_603_18715"
                                result="effect4_dropShadow_603_18715"
                            />
                            <feBlend
                                in="SourceGraphic"
                                in2="effect4_dropShadow_603_18715"
                                result="shape"
                            />
                        </filter>
                        <linearGradient
                            id="prefix__paint0_linear_603_18715"
                            x1={-34.5}
                            y1={26.5}
                            x2={33}
                            y2={26.5}
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop />
                            <stop offset={1} stopColor="#fff" />
                        </linearGradient>
                    </defs>
                </svg>
            );
        case 'MENUING':
            return (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width={30}
                        height={30}
                        viewBox="0 0 30 30"
                        fill="none"
                    >
                        <g clipPath="url(#prefix__clip0_603_18713)">
                            <rect width={30} height={30} rx={3} fill="#F9A825" />
                            <rect
                                width={30}
                                height={30}
                                rx={3}
                                fill="url(#prefix__paint0_linear_603_18713)"
                                fillOpacity={0.54}
                                style={{
                                    mixBlendMode: "luminosity",
                                }}
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M28 9.982h-7.44l-5.022 5.023 5.024 5.024H28v7.983h-7.983V20.56L15 15.542 9.983 20.56v7.45H2v-7.982h7.44l5.023-5.023L9.44 9.983H2V2h7.983v7.45L15 14.467l5.017-5.017V2H28v7.982z"
                                fill="#6A4100"
                            />
                            <path fill="#6A4100" d="M16 16h14v12H16z" />
                            <g filter="url(#prefix__filter0_dddd_603_18713)">
                                <path d="M24.488 18.727V26h-1.974v-7.273h1.974z" fill="#FFE2B5" />
                            </g>
                            <path fill="#6A4100" d="M12.5 13.611h4v4h-4z" />
                            <g clipPath="url(#prefix__clip1_603_18713)">
                                <path fill="#6A4100" d="M15 2H0v14h15z" />
                                <g filter="url(#prefix__filter1_dddd_603_18713)" fill="#FEFEFE">
                                    <path d="M8.193 3A.193.193 0 008 3.194c0 .01.004.018.006.028H8v4.585c0 .106.087.193.193.193h4.585v-.006c.01.002.019.006.029.006A.193.193 0 0013 7.807 4.858 4.858 0 008.193 3z" />
                                    <path d="M12 8.947a.199.199 0 00-.199-.199H7.464a.199.199 0 01-.199-.199V4.23H7.26c.002-.01.006-.02.006-.03 0-.11-.089-.199-.199-.199-.004 0-.008.003-.013.003V4H7a5 5 0 105 5l-.001-.049.001-.005z" />
                                </g>
                            </g>
                        </g>
                        <defs>
                            <clipPath id="prefix__clip0_603_18713">
                                <rect width={30} height={30} rx={3} fill="#fff" />
                            </clipPath>
                            <clipPath id="prefix__clip1_603_18713">
                                <path
                                    fill="#fff"
                                    transform="matrix(-1 0 0 1 15 2)"
                                    d="M0 0h15v14H0z"
                                />
                            </clipPath>
                            <filter
                                id="prefix__filter0_dddd_603_18713"
                                x={15.514}
                                y={14.727}
                                width={15.975}
                                height={22.273}
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy={4} />
                                <feGaussianBlur stdDeviation={3.5} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                <feBlend
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_603_18713"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy={1} />
                                <feGaussianBlur stdDeviation={2.5} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                                <feBlend
                                    in2="effect1_dropShadow_603_18713"
                                    result="effect2_dropShadow_603_18713"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy={2} />
                                <feGaussianBlur stdDeviation={1} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
                                <feBlend
                                    in2="effect2_dropShadow_603_18713"
                                    result="effect3_dropShadow_603_18713"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feMorphology
                                    radius={2}
                                    in="SourceAlpha"
                                    result="effect4_dropShadow_603_18713"
                                />
                                <feOffset dy={3} />
                                <feGaussianBlur stdDeviation={0.5} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                                <feBlend
                                    in2="effect3_dropShadow_603_18713"
                                    result="effect4_dropShadow_603_18713"
                                />
                                <feBlend
                                    in="SourceGraphic"
                                    in2="effect4_dropShadow_603_18713"
                                    result="shape"
                                />
                            </filter>
                            <filter
                                id="prefix__filter1_dddd_603_18713"
                                x={-5}
                                y={-1}
                                width={25}
                                height={26}
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy={4} />
                                <feGaussianBlur stdDeviation={3.5} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                <feBlend
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_603_18713"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy={1} />
                                <feGaussianBlur stdDeviation={2.5} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                                <feBlend
                                    in2="effect1_dropShadow_603_18713"
                                    result="effect2_dropShadow_603_18713"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy={2} />
                                <feGaussianBlur stdDeviation={1} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
                                <feBlend
                                    in2="effect2_dropShadow_603_18713"
                                    result="effect3_dropShadow_603_18713"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feMorphology
                                    radius={2}
                                    in="SourceAlpha"
                                    result="effect4_dropShadow_603_18713"
                                />
                                <feOffset dy={3} />
                                <feGaussianBlur stdDeviation={0.5} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                                <feBlend
                                    in2="effect3_dropShadow_603_18713"
                                    result="effect4_dropShadow_603_18713"
                                />
                                <feBlend
                                    in="SourceGraphic"
                                    in2="effect4_dropShadow_603_18713"
                                    result="shape"
                                />
                            </filter>
                            <linearGradient
                                id="prefix__paint0_linear_603_18713"
                                x1={-34.5}
                                y1={26.5}
                                x2={33}
                                y2={26.5}
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop />
                                <stop offset={1} stopColor="#fff" />
                            </linearGradient>
                        </defs>
                    </svg>
                </>
            );
        case 'MENULOG':
            return (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width={30}
                        height={30}
                        viewBox="0 0 30 30"
                        fill="none"
                    >
                        <g clipPath="url(#prefix__clip0_603_18716)">
                            <rect width={30} height={30} rx={3} fill="#499E8F" />
                            <rect
                                width={30}
                                height={30}
                                rx={3}
                                fill="url(#prefix__paint0_linear_603_18716)"
                                fillOpacity={0.54}
                                style={{
                                    mixBlendMode: "luminosity",
                                }}
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M28 9.982h-7.44l-5.022 5.023 5.024 5.024H28v7.983h-7.983V20.56L15 15.542 9.983 20.56v7.45H2v-7.982h7.44l5.023-5.023L9.44 9.983H2V2h7.983v7.45L15 14.467l5.017-5.017V2H28v7.982z"
                                fill="#1F6357"
                            />
                            <path fill="#1F6357" d="M15 16.111h15v11.944H15z" />
                            <g filter="url(#prefix__filter0_dddd_603_18716)">
                                <path
                                    d="M22.586 21.455h-2.003a1.36 1.36 0 00-.114-.451 1.019 1.019 0 00-.248-.348c-.105-.1-.231-.175-.38-.227a1.475 1.475 0 00-.508-.082c-.332 0-.612.08-.842.241a1.49 1.49 0 00-.518.693c-.116.3-.174.662-.174 1.083 0 .445.059.818.177 1.119.121.298.295.523.522.674.228.15.501.224.82.224.183 0 .346-.023.49-.067a1.15 1.15 0 00.377-.203c.107-.088.193-.193.26-.316.068-.126.114-.266.138-.423l2.003.015c-.024.307-.11.621-.26.94-.149.318-.36.611-.635.881-.272.268-.61.483-1.012.647-.403.163-.87.245-1.403.245-.668 0-1.267-.144-1.797-.43a3.115 3.115 0 01-1.253-1.264c-.306-.557-.458-1.237-.458-2.042 0-.81.156-1.492.468-2.046a3.13 3.13 0 011.264-1.26 3.675 3.675 0 011.776-.43c.46 0 .882.063 1.268.188a3.05 3.05 0 011.015.55c.292.24.526.535.703.885.178.35.286.752.324 1.204zM27.402 21a.767.767 0 00-.266-.554c-.157-.132-.395-.199-.714-.199-.204 0-.37.025-.5.075a.601.601 0 00-.285.195.482.482 0 00-.096.284.467.467 0 00.046.238.574.574 0 00.178.188c.08.055.183.105.309.15.125.045.274.085.447.12l.597.128c.402.085.747.198 1.033.338.287.14.521.304.703.493.183.187.316.398.402.632.087.235.132.49.134.767-.002.479-.121.883-.358 1.215-.237.331-.575.583-1.016.756-.438.173-.964.26-1.58.26-.632 0-1.184-.094-1.655-.281a2.306 2.306 0 01-1.094-.863c-.258-.39-.388-.89-.39-1.499h1.875c.012.223.067.41.167.561.1.152.239.267.419.345.182.078.399.117.65.117.21 0 .387-.026.529-.078a.715.715 0 00.323-.217.512.512 0 00.113-.316.449.449 0 00-.11-.29.852.852 0 00-.34-.228 3.623 3.623 0 00-.643-.192l-.725-.156c-.644-.14-1.151-.373-1.523-.7-.37-.329-.553-.777-.55-1.346-.003-.461.12-.865.369-1.21a2.47 2.47 0 011.04-.814c.445-.194.956-.29 1.53-.29.588 0 1.096.097 1.524.294.429.196.759.473.991.83.234.356.353.771.355 1.247h-1.89z"
                                    fill="#C3FFF4"
                                />
                            </g>
                            <path fill="#1F6357" d="M12.5 13.611h4v4h-4z" />
                            <g clipPath="url(#prefix__clip1_603_18716)">
                                <path fill="#1F6357" d="M15 2H0v14h15z" />
                                <g filter="url(#prefix__filter1_dddd_603_18716)">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12.675 5.036a.516.516 0 01.325.48v5.969a.518.518 0 01-.325.48l-4.984 1.998a.515.515 0 01-.383 0l-4.984-1.998a.516.516 0 01-.324-.48v-5.97a.518.518 0 01.324-.48l4.793-1.921.003-.001.188-.076c.123-.05.26-.05.384 0l.188.076h.003l4.792 1.923zm-.944.363L7.5 7.096 3.27 5.399l-.583.234v.275L7.157 7.7v5.46l.343.137.344-.137V7.7l4.468-1.791v-.276l-.581-.234z"
                                        fill="#FEFEFE"
                                    />
                                </g>
                            </g>
                        </g>
                        <defs>
                            <clipPath id="prefix__clip0_603_18716">
                                <rect width={30} height={30} rx={3} fill="#fff" />
                            </clipPath>
                            <clipPath id="prefix__clip1_603_18716">
                                <path
                                    fill="#fff"
                                    transform="matrix(-1 0 0 1 15 2)"
                                    d="M0 0h15v14H0z"
                                />
                            </clipPath>
                            <filter
                                id="prefix__filter0_dddd_603_18716"
                                x={8.768}
                                y={14.628}
                                width={27.623}
                                height={22.472}
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy={4} />
                                <feGaussianBlur stdDeviation={3.5} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                <feBlend
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_603_18716"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy={1} />
                                <feGaussianBlur stdDeviation={2.5} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                                <feBlend
                                    in2="effect1_dropShadow_603_18716"
                                    result="effect2_dropShadow_603_18716"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy={2} />
                                <feGaussianBlur stdDeviation={1} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
                                <feBlend
                                    in2="effect2_dropShadow_603_18716"
                                    result="effect3_dropShadow_603_18716"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feMorphology
                                    radius={2}
                                    in="SourceAlpha"
                                    result="effect4_dropShadow_603_18716"
                                />
                                <feOffset dy={3} />
                                <feGaussianBlur stdDeviation={0.5} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                                <feBlend
                                    in2="effect3_dropShadow_603_18716"
                                    result="effect4_dropShadow_603_18716"
                                />
                                <feBlend
                                    in="SourceGraphic"
                                    in2="effect4_dropShadow_603_18716"
                                    result="shape"
                                />
                            </filter>
                            <filter
                                id="prefix__filter1_dddd_603_18716"
                                x={-5}
                                y={-1}
                                width={25}
                                height={26}
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy={4} />
                                <feGaussianBlur stdDeviation={3.5} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                <feBlend
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_603_18716"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy={1} />
                                <feGaussianBlur stdDeviation={2.5} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                                <feBlend
                                    in2="effect1_dropShadow_603_18716"
                                    result="effect2_dropShadow_603_18716"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy={2} />
                                <feGaussianBlur stdDeviation={1} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
                                <feBlend
                                    in2="effect2_dropShadow_603_18716"
                                    result="effect3_dropShadow_603_18716"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feMorphology
                                    radius={2}
                                    in="SourceAlpha"
                                    result="effect4_dropShadow_603_18716"
                                />
                                <feOffset dy={3} />
                                <feGaussianBlur stdDeviation={0.5} />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                                <feBlend
                                    in2="effect3_dropShadow_603_18716"
                                    result="effect4_dropShadow_603_18716"
                                />
                                <feBlend
                                    in="SourceGraphic"
                                    in2="effect4_dropShadow_603_18716"
                                    result="shape"
                                />
                            </filter>
                            <linearGradient
                                id="prefix__paint0_linear_603_18716"
                                x1={-34.5}
                                y1={26.5}
                                x2={33}
                                y2={26.5}
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop />
                                <stop offset={1} stopColor="#fff" />
                            </linearGradient>
                        </defs>
                    </svg>
                </>
            );
        default:
            return <></>;
    }
};


export const completdMenus = (codmenu: { codmenu: string }[]) => {
    return codmenu.map((menu) => {
        return {
            menu: menu.codmenu,
            label: getLabel(menu.codmenu as CodMenu),
            path: getPath(menu.codmenu as CodMenu),
            icon: getMenuIcon(menu.codmenu as CodMenu),
        };
    });
};
