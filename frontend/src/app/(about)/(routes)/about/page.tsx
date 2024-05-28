import React from "react";
import classNames from "classnames/bind";
import Founder from "~/components/Founder";
import founders from "~/constants/founders";
import styles from "./About.module.scss";
import Title from "~/components/Title";
import Banner from "~/components/Banner";
import Button from "~/components/Button";
import routes from "~/configs/routes";
const cx = classNames.bind(styles);

type Props = {};
const About = function ({}: Props) {
    return (
        <main className={cx("wrapper")}>
            <div className={cx("container")}>
                <Banner />

                <section className={cx("founder-wrapper")}>
                    <div id="founder-contact" className={cx("founder-container")}>
                        {founders?.map(function (founder: any, index: number) {
                            return (
                                <Founder
                                    role={founder.role}
                                    twitter={founder.twitter}
                                    linkedin={founder.linkedin}
                                    lastName={founder.lastName}
                                    firstName={founder.firstName}
                                    company={founder.company}
                                    avatar={founder.avatar}
                                    key={index}
                                    description={founder.description}
                                />
                            );
                        })}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default About;
