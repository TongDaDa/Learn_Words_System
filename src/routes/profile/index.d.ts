import * as React from 'react';

export interface ProfileIndexProps {
    title?: string;
    emptyText?: React.ReactNode;
    emptyImage?: string;
    style?: React.CSSProperties;
}

export class NoticeIconTab extends React.Component<ProfileIndexProps, any> {}

export default class NoticeIcon extends React.Component<ProfileIndexProps, any> {
    static Tab: typeof NoticeIconTab;
}
