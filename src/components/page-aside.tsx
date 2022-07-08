import type { ReactNode } from 'react';
import { Link, useMatch, useParams } from 'react-router-dom';
import { ids } from '~/dom-ids';
import TemplateIcon from '@heroicons/react/outline/TemplateIcon';
import GlobeIcon from '@heroicons/react/outline/GlobeIcon';
import FlagIcon from '@heroicons/react/outline/FlagIcon';
import LibraryIcon from '@heroicons/react/outline/LibraryIcon';
import OfficeBuildingIcon from '@heroicons/react/outline/OfficeBuildingIcon';
import BriefcaseIcon from '@heroicons/react/outline/BriefcaseIcon';
import UserIcon from '@heroicons/react/outline/UserIcon';
import { cx } from '~/utils/cx';
import type { SupportedLanguage } from '~/i18n/i18n';

type AsideLinkProps = {
    active: boolean;
    icon: ReactNode;
    to: string;
    text: ReactNode;
};

const AsideLink = ({ active, icon, to, text }: AsideLinkProps) => {
    return (
        <li className="p-2">
            <Link to={to} className={cx(['aside-link', active && 'bg-aside-link-active'])}>
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
    const { language = 'en' } = useParams<{ language: SupportedLanguage }>();
    const dashboardMatch = useMatch('/:language');
    const regionMatch = useMatch('/:language/region');
    const countryMatch = useMatch('/:language/country');
    const locationMatch = useMatch('/:language/location');
    const departmentMatch = useMatch('/:language/department');
    const jobMatch = useMatch('/:language/job');
    const employeeMatch = useMatch('/:language/employee');

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
                    />
                    <AsideLink
                        active={!!regionMatch}
                        icon={<GlobeIcon className="w-6 h-6" />}
                        to={`/${language}/region`}
                        text="Region"
                    />
                    <AsideLink
                        active={!!countryMatch}
                        icon={<FlagIcon className="w-6 h-6" />}
                        to={`/${language}/country`}
                        text="Country"
                    />
                    <AsideLink
                        active={!!locationMatch}
                        icon={<LibraryIcon className="w-6 h-6" />}
                        to={`/${language}/location`}
                        text="Location"
                    />
                    <AsideLink
                        active={!!departmentMatch}
                        icon={<OfficeBuildingIcon className="w-6 h-6" />}
                        to={`/${language}/department`}
                        text="Department"
                    />
                    <AsideLink
                        active={!!jobMatch}
                        icon={<BriefcaseIcon className="w-6 h-6" />}
                        to={`/${language}/job`}
                        text="Job"
                    />
                    <AsideLink
                        active={!!employeeMatch}
                        icon={<UserIcon className="w-6 h-6" />}
                        to={`/${language}/employee`}
                        text="Employee"
                    />
                </ul>
            </div>
        </div>
    );
};
