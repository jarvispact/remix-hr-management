import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useMatch, useParams } from 'react-router-dom';
import { ids } from '~/dom-ids';
import TemplateIcon from '@heroicons/react/outline/TemplateIcon';
import GlobeIcon from '@heroicons/react/outline/GlobeIcon';
import LibraryIcon from '@heroicons/react/outline/LibraryIcon';
import OfficeBuildingIcon from '@heroicons/react/outline/OfficeBuildingIcon';
import BriefcaseIcon from '@heroicons/react/outline/BriefcaseIcon';
import UserIcon from '@heroicons/react/outline/UserIcon';
import { cx } from '~/utils/cx';
import type { SupportedLanguage } from '~/i18n/i18n';
import { usePageContext } from '~/page-context';

type AsideLinkProps = {
    active: boolean;
    icon: ReactNode;
    to: string;
    text: ReactNode;
    onClick: React.MouseEventHandler<HTMLAnchorElement>;
    tabIndex: React.HTMLAttributes<HTMLAnchorElement>['tabIndex'];
};

const AsideLink = ({ active, icon, to, text, onClick, tabIndex }: AsideLinkProps) => {
    return (
        <li className="p-2">
            <Link
                to={to}
                onClick={onClick}
                className={cx(['aside-link', active && 'bg-aside-link-active'])}
                tabIndex={tabIndex}
            >
                {icon}
                {text}
            </Link>
        </li>
    );
};

type AsideProps = {
    h2: ReactNode;
};

export const PageAside = ({ h2 }: AsideProps) => {
    const [tabIndex, setTabIndex] = useState<0 | -1>(0);
    const { isDrawerOpen, closeDrawer } = usePageContext();
    const { language = 'en' } = useParams<{ language: SupportedLanguage }>();
    const dashboardMatch = useMatch('/:language');
    const countryMatch = useMatch('/:language/country');
    const locationMatch = useMatch('/:language/location');
    const departmentMatch = useMatch('/:language/department');
    const jobMatch = useMatch('/:language/job');
    const employeeMatch = useMatch('/:language/employee');

    useEffect(() => {
        const { matches: isDesktop } = window.matchMedia('(min-width: 1024px)');
        setTabIndex(isDesktop ? 0 : isDrawerOpen ? 0 : -1);
    }, [isDrawerOpen, setTabIndex]);

    return (
        <div className="bg-surface-1 h-full border-r border-r-border">
            <div>
                <h2 id={ids.pageAside} className="sr-only">
                    {h2}
                </h2>
                <ul className="pt-32">
                    <AsideLink
                        active={!!dashboardMatch}
                        icon={<TemplateIcon className="w-6 h-6" />}
                        to=""
                        text="Dashboard"
                        onClick={closeDrawer}
                        tabIndex={tabIndex}
                    />
                    <AsideLink
                        active={!!countryMatch}
                        icon={<GlobeIcon className="w-6 h-6" />}
                        to={`/${language}/country`}
                        text="Country"
                        onClick={closeDrawer}
                        tabIndex={tabIndex}
                    />
                    <AsideLink
                        active={!!locationMatch}
                        icon={<LibraryIcon className="w-6 h-6" />}
                        to={`/${language}/location`}
                        text="Location"
                        onClick={closeDrawer}
                        tabIndex={tabIndex}
                    />
                    <AsideLink
                        active={!!departmentMatch}
                        icon={<OfficeBuildingIcon className="w-6 h-6" />}
                        to={`/${language}/department`}
                        text="Department"
                        onClick={closeDrawer}
                        tabIndex={tabIndex}
                    />
                    <AsideLink
                        active={!!jobMatch}
                        icon={<BriefcaseIcon className="w-6 h-6" />}
                        to={`/${language}/job`}
                        text="Job"
                        onClick={closeDrawer}
                        tabIndex={tabIndex}
                    />
                    <AsideLink
                        active={!!employeeMatch}
                        icon={<UserIcon className="w-6 h-6" />}
                        to={`/${language}/employee`}
                        text="Employee"
                        onClick={closeDrawer}
                        tabIndex={tabIndex}
                    />
                </ul>
            </div>
        </div>
    );
};
